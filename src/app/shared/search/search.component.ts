import { Component, OnInit, OnChanges, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CoreService } from 'src/app/core/services/core.service';
import { SearchService } from './services/search.service';
import { InsuredSummary } from '../models/insured-summary.model';
import { DetailsSharingService } from '../../core/services/details-sharing.service';
import { environment } from 'src/environments/environment';
import { BreadCrumb } from '../Modals/Models/breadcrumb.model';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { StateManagementService } from 'src/app/core/services/state-management.service';

@Component({
  selector: 'cwb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.' + environment.cwbTheme + '.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {
  faSearch: IconDefinition = faSearch;
  faTimes = faTimes;

  nameSearchControl = new FormControl();
  memberIdControl = new FormControl();
  invIdControl = new FormControl();
  claimNoControl = new FormControl();
  filteredStates: Observable<InsuredSummary[]>;
  searchSummary: InsuredSummary[] = [];
  searchResults: InsuredSummary[];
  isResultClicked = false;
  policyNo: string;
  isLoading: boolean;
  enterCount = 0;
  isNameSearch: boolean;
  currentAccountStatuses = [];
  currentClientNumber: string;
  resultClicked: InsuredSummary;
  public breadcrumbs: BreadCrumb[];
  @Output() currentPolicyEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchText', { static: false }) searchInput: ElementRef;
  isSidenavExpanded: boolean;

  ngOnInit(): void {
    this.detailsSharing.isSidenavExpanded.subscribe(
      v => {
        this.isSidenavExpanded = v;
      }
    );
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.setBreadcrumbs();
    });

    this.nameSearchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(data => {
      const searchValue = this.nameSearchControl.value;
      if (searchValue.length >= 3) {
        this._filterStates(searchValue);
      }
      else {
        this.searchResults = [];
      }
    });
  }
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
  ngOnChanges() {
    this.searchInput.nativeElement.focus();
  }
  // method to set the breadcrumb
  setBreadcrumbs() {
    const latestBreadcrumb = this.buildBreadCrumb(this.route.root);
    let i = 0;
    for (const x of this.breadcrumbs) {
      const index = latestBreadcrumb.findIndex(y => x.label === y.label);
      if (index > -1) {
        this.breadcrumbs.splice(i, 1);
      }
      i = i + 1;
    }
    const newBreadcrumbs = [...this.breadcrumbs, ...this.buildBreadCrumb(this.route.root)];
    while (newBreadcrumbs.length > 2) {
      newBreadcrumbs.shift();
    }
    return newBreadcrumbs;
  }
  // keydown function for search functionality
  keyDownFunction($event: KeyboardEvent) {
    if ($event.code === 'Enter') {
      if (this.isResultClicked) {
        this.enterCount = this.enterCount + 1;
        if (this.enterCount === 2) {
          this.onSearch();
        }
      }
      const searchValue = this.nameSearchControl.value.trim();
      if (this.coreService.isControlNumber(searchValue) || this.coreService.isPolicyNumber(searchValue) && !searchValue.includes('-')) {
        this.onSearch();
      }
    }
  }

  constructor(private router: Router, private stateMgmt: StateManagementService, private coreService: CoreService,
              private searchService: SearchService, private detailsSharing: DetailsSharingService,
              private route: ActivatedRoute) {
    this.detailsSharing.isSearchLoading.subscribe((v) => {
      this.isLoading = v;
    });
    this.breadcrumbs = this.buildBreadCrumb(this.route.root);
  }
  // buildshe breadcrumb
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    let queryParams = null;
    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      // label = route.snapshot.params[paramName];
    }
    if (route.snapshot.queryParams) {
      queryParams = route.snapshot.queryParams;
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label,
      url: nextUrl,
      queryParams
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
  // filters the search values
  public _filterStates(value: string): InsuredSummary[] {
    const filterValue = value.toLowerCase();
    if (filterValue !== null) {
      const searchValue: string = filterValue || '';
      this.isNameSearch = false;

      if (this.coreService.isControlNumber(searchValue) || this.coreService.isPolicyNumber(searchValue) ||
        this.coreService.isMemberSearch(searchValue)) {
        // DO NOTHTING BECAUSE ITS HANDLED ON THE FORM SUBMIT.
        return [];
      } else {
        this.searchForPerson(filterValue);
      }
    }

  }
  // searches the person
   searchForPerson(filterValue: string) {
    if (filterValue !== '' && filterValue !== null) {
      let c = 0;
      this.searchService.searchForAccountCustomer(filterValue)
        .subscribe(
          response => {
            c = c + 1;
            this.searchSummary = response.data;
            this.searchResults = this.searchSummary.filter(state => state.lastName.toLowerCase().indexOf(filterValue) === 0);
          }
        );
    }
  }
  // checks the relationship
  checkRelationship(relationship: string) {
    if (relationship === 'Primary') {
      return 'P';
    }
    if (relationship === 'Spouse') {
      return 'S';
    }
    if (relationship === 'Dependent') {
      return 'D';
    }
    if (relationship === 'Unknown') {
      return 'Unknown';
    }
  }
  // clears the searched value
  onClearSearch() {
    this.nameSearchControl.setValue('');
  }
  // clears the member id search
  onClearMemberSearch() {
    this.memberIdControl.setValue('');
  }
  // gets the searched value if the searched value is present
  onSearch() {
    this.isResultClicked = false;
    this.enterCount = 0;
    this.route.params.subscribe((params: ParamMap) => {
      this.policyNo = params['ctrlno'];
    });
    if (this.nameSearchControl.value && !this.memberIdControl.value && !this.invIdControl.value && !this.claimNoControl.value) {
      if (this.nameSearchControl.value.length > 3) {
        this.searchByNameOrPolicy();
      }
      else {
        return;
      }
    }

    else if ((this.memberIdControl.value && !this.nameSearchControl.value && !this.invIdControl.value && !this.claimNoControl.value)) {
      this.searchByMemberId();
    }
    else if ((this.invIdControl.value && !this.nameSearchControl.value && !this.memberIdControl.value && !this.claimNoControl.value)) {
      // this.searchByInvID();
    }
    else if ((this.claimNoControl.value && !this.nameSearchControl.value && !this.memberIdControl.value && !this.invIdControl.value)) {
      this.searchByClaimNo();
    }
    else if ((!this.invIdControl.value && !this.nameSearchControl.value && !this.memberIdControl.value && !this.claimNoControl.value)) {
      return;
    }
    else {
      this.detailsSharing.openSnackBar('Please Search Using Name,Policy Number,Member ID or Investigation ID Only', 'Dismiss', true);
    }
  }

  onSearchResultClick(insuredSummary: InsuredSummary) {
    this.isResultClicked = true;
    this.enterCount = 0;
    this.resultClicked = insuredSummary;
  }

  onOptionClicked() {
    this.enterCount = this.enterCount + 1;
  }
  // searches by name or policy
  searchByNameOrPolicy() {
    let searchValue;
    searchValue = this.nameSearchControl.value.trim();
    if (this.coreService.isControlNumber(searchValue) || this.coreService.isPolicyNumber(searchValue) && !searchValue.includes('-')) {
      searchValue = searchValue.toUpperCase();
      this.policyNo = searchValue;
      if (!(searchValue.length >= 9 && searchValue.length <= 10)) {
        this.detailsSharing.openSnackBar('Policy Number or Control Number is invalid.', 'Dismiss', true);
        return;
      }
      this.nameSearchControl.setValue('');
      this.currentPolicyEmitter.emit(this.policyNo);
      this.stateMgmt.setPolicyDetails(null);
      this.stateMgmt.setClaimDetails(null);
      this.stateMgmt.setInsuredDetails(null);
      this.detailsSharing.isSearchActive = true;
      this.router.navigate(['policy-account', this.policyNo]);
    }
    else {
      if (this.resultClicked) {
        if (this.policyNo) {
          if (this.currentClientNumber !== this.resultClicked.clientNo) {
            this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
          }
          else {
            this.nameSearchControl.setValue('');
            return;
          }
        }
        else {
          this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
        }
      }
      else {
        this.detailsSharing.openSnackBar('Please Enter Valid Policy Number', 'Dismiss', true);
      }
    }
  }
  // searches my member id
  searchByMemberId() {
    const clientNo = this.memberIdControl.value.trim();
    this.memberIdControl.setValue('');
    if (this.currentClientNumber) {
      if (this.currentClientNumber !== clientNo) {
        this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
      }
      else {
        this.nameSearchControl.setValue('');
        return;
      }
    }
    else {
      this.getPolicyNumberByClientNumber(clientNo);
    }
  }
  // searches by claim number
  searchByClaimNo() {
    const claimNo = this.claimNoControl.value.trim();
    this.claimNoControl.setValue('');
    this.getPolicyNumberByClaimNumber(claimNo);
  }
  // searches by investigation id
  searchByInvID() {
    this.stateMgmt.setInvestigationDetails(null);
    const invNumber: string = this.invIdControl.value.trim();
    this.invIdControl.setValue('');
    if (invNumber.toUpperCase().startsWith('INV')) {
      this.detailsSharing.invForRoute.next({
        name: invNumber,
        query: 'invId',
        value: 'search'
      });
      this.stateMgmt.setInvestigationDetails(null);
      this.detailsSharing.isSearchActive = true;
      this.router.navigate(['investigations', invNumber.toUpperCase()], {
        queryParams: {
          invId: 'search'
        }
      });
    }
    else {
      this.detailsSharing.openSnackBar('Please enter a valid Investigation Number', 'Dismiss', true);
    }
  }
  // gets the policy number using a service call by passing claim number as a parameter
  getPolicyNumberByClaimNumber(claimNo) {
    this.searchService.getClaimsByClaimNumber(claimNo).subscribe(
      response => {
        if (!!!response.data || response.data.length === 0) {
          this.detailsSharing.openSnackBar(`Sorry Claim Number: ${claimNo} was not found. Please try again.`, 'Dismiss', true);
        }
        else {
          this.stateMgmt.setPolicyDetails({ ...this.stateMgmt.getPolicyDetails(), selectedTab: 1 });
          this.stateMgmt.setClaimDetails(null);
          this.policyNo = response.data[0].policyNo;
          this.detailsSharing.isSearchActive = true;
          this.router.navigate(['policy-account', this.policyNo], {
            queryParams: {
              claims: claimNo
            }
          });
        }
      }
    );
  }

  // gets the policy number by client number using a service call
  getPolicyNumberByClientNumber(clientNo) {
    this.searchService.getPolicyNumberByClientNumber(clientNo).subscribe(
      policyNo => {
        if (!!!policyNo.data || policyNo.data.length === 0) {
          this.detailsSharing.openSnackBar(`Sorry Member ID: ${clientNo} was not found. Please try again.`, 'Dismiss', true);
        }
        else {
          this.policyNo = policyNo.data;
          this.memberIdControl.setValue('');
          this.nameSearchControl.setValue('');
          this.invIdControl.setValue('');
          this.claimNoControl.setValue('');
          this.currentPolicyEmitter.emit(this.policyNo);
          this.currentClientNumber = clientNo;
          this.stateMgmt.setPolicyDetails(null);
          this.stateMgmt.setClaimDetails(null);
          this.stateMgmt.setInsuredDetails(null);
          this.detailsSharing.isSearchActive = true;
          this.router.navigate(['policy-account', this.policyNo]);
        }
      }
    );
  }

}

