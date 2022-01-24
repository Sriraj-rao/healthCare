import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  faSearch,
  IconDefinition,
  faTimes,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InsuredSummary } from 'src/app/shared/models/insured-summary.model';
import { CoreService } from 'src/app/core/services/core.service';
import { SearchService } from 'src/app/shared/search/services/search.service';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvestigationsService } from '../../services/investigation.service';
import { MatSort, MatSortHeaderIntl, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttachClaimModel } from '../../models/attach-claim.model';
import { PendCodesModel } from '../../models/pend-codes.model';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HelperMethods } from '../../helper-methods/helper-methods';
import { AttachedClaimsInjectedData } from '../../models/modals-injected-models/attach-claims-injected.model';

@Component({
  selector: 'cwb-add-claims-popup',
  templateUrl: './add-claims-popup.component.html',
  styleUrls: ['./add-claims-popup.component.scss'],
})
export class AddClaimsPopupComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  constructor(
    private coreService: CoreService,
    private investigationService: AddInvestigationService,
    public dialogRef: MatDialogRef<AddClaimsPopupComponent>,
    private searchService: SearchService,
    private detailsSharing: DetailsSharingService,
    private claimsService: ClaimsService,
    @Inject(MAT_DIALOG_DATA)
    public attachClaimsPopupData: AttachedClaimsInjectedData,
    private invService: InvestigationsService
  ) {
    this.detailsSharing.isSearchLoading.subscribe((v) => {
      this.isLoading = v;
    });
  }
  // icons
  faSearch: IconDefinition = faSearch;
  faTimes = faTimes;
  faEdit = faEdit;

  nameSearchControl = new FormControl();
  memberIdControl = new FormControl();
  claimNoControl = new FormControl();
  filteredStates: Observable<InsuredSummary[]>;
  searchSummary: InsuredSummary[] = [];
  searchResults: InsuredSummary[];
  // boolean
  disableHeaderSelect = true;
  isResultClicked = false;
  isLoading: boolean;
  isSubmitClicked = false;
  allCheckboxSelected = false;

  policyNo: string;
  enterCount = 0;
  currentClientNumber: string;
  resultClicked: InsuredSummary;
  dataSource: MatTableDataSource<Claim>;
  claimDetails: Claim[] = [];

  investigationId = this.attachClaimsPopupData.investigationId;
  investigationNumber = this.attachClaimsPopupData.investigationNumber;
  investigationType = this.attachClaimsPopupData.investigationType;
  alreadyExistingClaims: Claim[] = this.attachClaimsPopupData.attachedClaims;
  pendCodeControl = new FormArray([]);
  private sort: MatSort;
  pendCodeSearchControl = new FormArray([]);
  pendCodes: PendCodesModel[] = [];
  alreadyExistingMessage: string;
  pendCodeHeaderControl = new FormControl();
  pendCodeHeaderSearchControl = new FormControl();
  allCheckboxControl: FormControl = new FormControl();
  helperMethods = new HelperMethods();

  @ViewChildren('inputChildPendCode') myValue: QueryList<ElementRef>;

  displayedColumns: string[] = [
    'checkbox',
    'claimNum',
    'name',
    'policyNo',
    'claimDate',
    'diagnosis',
    'benefitType',
    'totalCharges',
    'pendCode',
  ];
  @ViewChild('inputPendCode') pendCodeSearchElements: ElementRef;

  onChildPendCodeClicked(i: number) {
    setTimeout(() => {
      this.myValue.toArray()[i].nativeElement.focus();
    }, 0);
  }

  ngOnInit(): void {
    this.getClaimsDetails(this.attachClaimsPopupData.policyNo);
    this.nameSearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        const searchValue = this.nameSearchControl.value;
        if (searchValue.length >= 3) {
          this._filterStates(searchValue);
        } else {
          this.searchResults = [];
        }
      });
    this.getPendCodes();
  }

  // gives the alert message if no claim is selected
  onSelectClicked() {
    if (HelperMethods.isHeaderSelectDisabled(this.claimDetails)) {
      this.detailsSharing.openSnackBar(
        `Please Select a Claim.`,
        'Dismiss',
        true
      );
    } else {
      setTimeout(() => {
        this.pendCodeSearchElements.nativeElement.focus();
      }, 0);
    }
  }

  // resets the pendcode field
  onPendCodeHeaderClosed() {
    this.pendCodeHeaderSearchControl.reset();
  }

  // clears the header search
  onClearHeaderSearch() {
    this.pendCodeHeaderSearchControl.setValue('');
    this.onSelectClicked();
  }

  // setd the vlaue that has been changed
  onHeaderChanged(value) {
    this.pendCodeControl.controls.forEach((x, i) => {
      if (this.claimDetails[i].isCheckboxClicked) {
        x.setValue(value);
      }
    });
  }

  // allows to search using keyboard
  keyDownFunction($event: KeyboardEvent) {
    if ($event.code === 'Enter') {
      if (this.isResultClicked) {
        this.enterCount = this.enterCount + 1;
        if (this.enterCount === 2) {
          this.onSearch();
        }
      }
      const searchValue = this.nameSearchControl.value.trim();
      if (
        this.coreService.isControlNumber(searchValue) ||
        (this.coreService.isPolicyNumber(searchValue) &&
          !searchValue.includes('-'))
      ) {
        this.onSearch();
      }
    }
  }

  // clears the pendcode field
  onPendCodeDropdownClosed(i: number) {
    this.pendCodeSearchControl.controls[i].reset();
  }

  // sorts the claims details
  sortData(sort: Sort) {
    const data = this.claimDetails.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'claimNum':
            return this.compare(a.claimNum, b.claimNum, isAsc);
          case 'diagnosis':
            return this.compare(a.diagnosis, b.diagnosis, isAsc);
          case 'policyNo':
            return this.compare(a.policyNo, b.policyNo, isAsc);
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'benefitType':
            return this.compare(a.benefitType, b.benefitType, isAsc);
          case 'totalCharges':
            return this.compare(a.totalCharges, b.totalCharges, isAsc);
          case 'pendCode':
            return this.compare(
              +this.pendCodeControl.controls[a.index].value.pendCode,
              +this.pendCodeControl.controls[b.index].value.pendCode,
              isAsc
            );
          default:
            return 0;
        }
      });
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    const test = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    return test;
  }

  // filters the search members , policy number or a name of policy holder
  private _filterStates(value: string): InsuredSummary[] {
    const filterValue = value.toLowerCase();
    if (filterValue !== null) {
      const searchValue: string = filterValue || '';
      if (
        this.coreService.isControlNumber(searchValue) ||
        this.coreService.isPolicyNumber(searchValue) ||
        this.coreService.isMemberSearch(searchValue)
      ) {
        // DO NOTHTING BECAUSE ITS HANDLED ON THE FORM SUBMIT.
        return [];
      } else {
        this.searchForPerson(filterValue);
      }
    }
  }

  // searches the policy holder by calling an api
  private searchForPerson(filterValue: string) {
    if (filterValue !== '' && filterValue !== null) {
      let c = 0;
      this.searchService
        .searchForAccountCustomer(filterValue)
        .subscribe((response) => {
          c = c + 1;
          this.searchSummary = response.data;
          this.searchResults = this.searchSummary.filter(
            (state) => state.lastName.toLowerCase().indexOf(filterValue) === 0
          );
        });
    }
  }

  // checks the relationship of the policy holder
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

  // clears the searched name
  onClearSearch() {
    this.nameSearchControl.setValue('');
  }

  // clears the member id
  onClearMemberSearch() {
    this.memberIdControl.setValue('');
  }

  // searches the policy holder based on the data entered by the user
  onSearch() {
    this.isResultClicked = false;
    this.enterCount = 0;
    if (
      this.nameSearchControl.value &&
      !this.memberIdControl.value &&
      !this.claimNoControl.value
    ) {
      if (this.nameSearchControl.value.length > 3) {
        this.searchByNameOrPolicy();
      } else {
        return;
      }
    } else if (
      this.memberIdControl.value &&
      !this.nameSearchControl.value &&
      !this.claimNoControl.value
    ) {
      this.searchByMemberId();
    } else if (
      this.claimNoControl.value &&
      !this.nameSearchControl.value &&
      !this.memberIdControl.value
    ) {
      this.searchByClaimNo();
    } else if (
      !this.nameSearchControl.value &&
      !this.memberIdControl.value &&
      !this.claimNoControl.value
    ) {
      return;
    } else {
      this.detailsSharing.openSnackBar(
        'Please Search Using Name,Policy Number,Member ID or Investigation ID Only',
        'Dismiss',
        true
      );
    }
  }

  // searches using insured summary
  onSearchResultClick(insuredSummary: InsuredSummary) {
    this.isResultClicked = true;
    this.enterCount = 0;
    this.resultClicked = insuredSummary;
  }

  // searched based on the option clicked
  onOptionClicked() {
    this.enterCount = this.enterCount + 1;
  }

  // searches by name or policy number
  searchByNameOrPolicy() {
    let searchValue;
    searchValue = this.nameSearchControl.value.trim();
    this.nameSearchControl.setValue('');
    if (
      this.coreService.isControlNumber(searchValue) ||
      (this.coreService.isPolicyNumber(searchValue) &&
        !searchValue.includes('-'))
    ) {
      searchValue = searchValue.toUpperCase();
      this.policyNo = searchValue;
      if (!(searchValue.length >= 9 && searchValue.length <= 10)) {
        this.detailsSharing.openSnackBar(
          'Policy Number or Control Number is invalid.',
          'Dismiss',
          true
        );
        return;
      }
      this.nameSearchControl.setValue('');
      this.getClaimsDetails(this.policyNo);
    } else {
      if (this.resultClicked) {
        if (this.policyNo) {
          if (this.currentClientNumber != this.resultClicked.clientNo) {
            this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
          } else {
            this.nameSearchControl.setValue('');
            return;
          }
        } else {
          this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
        }
      } else {
        this.detailsSharing.openSnackBar(
          'Please Enter Valid Policy Number',
          'Dismiss',
          true
        );
      }
    }
  }

  // searches by member id
  searchByMemberId() {
    const clientNo = this.memberIdControl.value.trim();
    this.memberIdControl.setValue('');

    if (this.currentClientNumber) {
      if (this.currentClientNumber != clientNo) {
        this.getPolicyNumberByClientNumber(this.resultClicked.clientNo);
      } else {
        this.nameSearchControl.setValue('');
        return;
      }
    } else {
      this.getPolicyNumberByClientNumber(clientNo);
    }
  }
  // searches by claim number
  searchByClaimNo() {
    const claimNo = this.claimNoControl.value.trim();
    this.claimNoControl.setValue('');
    this.getSingleClaimDetails(claimNo);
  }

  // assigning the claim details
  assignClaimDetails(claims: Claim[], isSingleClaim: boolean) {
    this.alreadyExistingMessage = null;
    this.claimDetails = [];
    claims.forEach((x) => {
      const index = this.alreadyExistingClaims.findIndex(
        (y) => y.claimNum === x.claimNum
      );
      if (index === -1 && x.status === 'S') {
        this.claimDetails.push(x);
      }
    });
    if (this.claimDetails.length === 0 && !isSingleClaim) {
      if (claims.length > 0) {
        this.alreadyExistingMessage =
          'Sorry, All claims for this claimant are already attached or processed.';
      }
    }
    if (this.claimDetails.length === 0 && isSingleClaim) {
      if (claims.length > 0) {
        this.alreadyExistingMessage =
          'Sorry, claim number ' +
          claims[0].claimNum +
          ' is already attached or processed.';
      }
    }
  }

  // gets the single claim details using the claims number entered
  getSingleClaimDetails(claimNumber) {
    this.claimsService
      .getClaimsByClaimNumber(claimNumber)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.assignClaimDetails(response.data, true);
          this.initializeDataSource();
        } else {
          this.detailsSharing.openSnackBar(
            `Sorry Claim Number: ${claimNumber} was not found. Please try again.`,
            'Dismiss',
            true
          );
        }
      });
  }

  // gets the claim details using policy number
  getClaimsDetails(policyNo: string) {
    this.claimsService
      .getPaginatedClaims(policyNo, false)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.assignClaimDetails(response.data, false);
          this.initializeDataSource();
        } else {
          this.detailsSharing.openSnackBar(
            `Sorry Claims for Policy Number: ${policyNo} was not found. Please try again.`,
            'Dismiss',
            true
          );
        }
      });
  }

  // initializes the data source attributes
  initializeDataSource() {
    this.pendCodeHeaderControl.reset();
    this.pendCodeControl = new FormArray([]);
    this.pendCodeSearchControl = new FormArray([]);
    this.allCheckboxSelected = false;
    this.allCheckboxControl.reset();
    this.claimDetails.forEach((x, i) => {
      x.isCheckboxClicked = false;
      x.pendingAmount = x.totalCharges - x.totalPaid;
      x.index = i;
      this.pendCodeSearchControl.push(new FormControl(''));
      const index = this.pendCodes.findIndex((y) => x.pendCode === y.pendCode);
      if (index === -1) {
        this.pendCodeControl.push(
          new FormControl({ value: '', disabled: true })
        );
      } else {
        this.pendCodeControl.push(
          new FormControl({ value: this.pendCodes[index], disabled: true })
        );
      }
    });
    this.dataSource = new MatTableDataSource(this.claimDetails);
    this.dataSource.sort = this.sort;
  }

  // gets the policy number by client number
  getPolicyNumberByClientNumber(clientNo) {
    this.searchService
      .getPolicyNumberByClientNumber(clientNo)
      .subscribe((policyNo) => {
        if (!!!policyNo.data || policyNo.data.length === 0) {
          this.detailsSharing.openSnackBar(
            `Sorry Member ID: ${clientNo} was not found. Please try again.`,
            'Dismiss',
            true
          );
        } else {
          this.policyNo = policyNo.data;
          this.memberIdControl.setValue('');
          this.nameSearchControl.setValue('');
          this.claimNoControl.setValue('');
          this.currentClientNumber = clientNo;
          this.getClaimsDetails(this.policyNo);
        }
      });
  }
  // clears the pendcode search
  onClearDropdownSearch(i: number) {
    this.pendCodeSearchControl.controls[i].setValue('');
    this.onChildPendCodeClicked(i);
  }

  // gets the pendcodes using the service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = [];
        for (const x of response.data) {
          this.pendCodes.push(x);
        }
      }
    });
  }
  // disabling or enabling the claims row based on the checkbox checked
  onCheckboxChanged(i) {
    this.claimDetails[i].isCheckboxClicked =
      !this.claimDetails[i].isCheckboxClicked;
    this.disableHeaderSelect = HelperMethods.isHeaderSelectDisabled(
      this.claimDetails
    );
    if (this.claimDetails[i].isCheckboxClicked === true) {
      if (this.pendCodeHeaderControl.value) {
        this.pendCodeControl.controls[i].setValue(
          this.pendCodeHeaderControl.value
        );
      }
    }
    this.enableSelectedControls();
  }
  // disabling or enabling the claims row based on the master checkbox checked
  onAllCheckboxChanged() {
    this.allCheckboxSelected = !this.allCheckboxSelected;
    this.claimDetails = this.claimDetails.map((x) => {
      x.isCheckboxClicked = this.allCheckboxSelected;
      return x;
    });
    this.disableHeaderSelect = HelperMethods.isHeaderSelectDisabled(
      this.claimDetails
    );
    if (this.allCheckboxSelected === true) {
      if (this.pendCodeHeaderControl.value) {
        this.assignHeaderValueToAllControls(this.pendCodeHeaderControl.value);
      }
    }
    this.enableSelectedControls();
  }

  // enabling the claims based on the checkbox checked
  enableSelectedControls() {
    this.claimDetails.forEach((x, i) => {
      if (x.isCheckboxClicked === true) {
        this.pendCodeControl.controls[i].enable();
      } else {
        this.pendCodeControl.controls[i].disable();
      }
    });
  }
  // assigning the header values based on the checkbox checked
  assignHeaderValueToAllControls(value) {
    this.claimDetails.forEach((x, i) => {
      if (x.isCheckboxClicked) {
        this.pendCodeControl.controls[i].setValue(value);
      }
    });
  }

  // validations for the required fields
  markRequiredFields() {
    this.claimDetails.forEach((x, i) => {
      if (x.isCheckboxClicked) {
        this.pendCodeControl.controls[i].setValidators([Validators.required]);
        this.pendCodeControl.controls[i].updateValueAndValidity();
      } else {
        this.pendCodeControl.controls[i].clearValidators();
        this.pendCodeControl.controls[i].updateValueAndValidity();
      }
    });
  }

  // submits the claims attached
  onSubmit() {
    this.isSubmitClicked = true;
    this.markRequiredFields();
    const rowsToSend: Claim[] = [];
    let count = 0;
    if (this.claimDetails) {
      for (const x of this.claimDetails) {
        if (x.isCheckboxClicked) {
          const pendValue = this.pendCodeControl.controls[x.index].value.pendCode;
          rowsToSend.push({ ...x, pendCode: pendValue });
        }
        count = count + 1;
      }
      if (rowsToSend.length === 0) {
        this.detailsSharing.openSnackBar(
          `Please Select A Claim To Attach.`,
          'Dismiss',
          true
        );
      } else {
        if (this.pendCodeControl.valid) {
          let confirmText: string;
          if (rowsToSend.length === 1) {
            confirmText =
              'Are you sure you want to attach claim number: ' +
              rowsToSend[0].claimNum +
              ' ?';
          } else {
            confirmText = 'Are you sure you want to attach all these claims ?';
          }
          this.detailsSharing
            .openAlertBox(confirmText, false, 'addClaims')
            .dialog.subscribe((data) => {
              if (this.detailsSharing.alertDialogData.submit) {
                this.submitClaimsAttached(rowsToSend);
              }
            });
        } else {
          this.detailsSharing.openSnackBar(
            `Please Select Pend Code.`,
            'Dismiss',
            true
          );
        }
      }
    } else {
      this.detailsSharing.openSnackBar(
        `Please Select A Claim To Attach.`,
        'Dismiss',
        true
      );
    }
  }

  // service call for attaching claims
  submitClaimsAttached(rowsToSend: Claim[]) {
    let count = 0;
    const postData: AttachClaimModel[] = [];
    for (const x of rowsToSend) {
      count = count + 1;
      postData.push({
        claimNum: x.claimNum,
        claimant: x.name,
        // createdBy: 'Dileep',
        investigationId: this.investigationId,
        pendCode: +x.pendCode,
      });
    }
    this.invService
      .attachClaimsToInvestigation(postData)
      .subscribe((response) => {
        if (response.data) {
          if (count === rowsToSend.length) {
            this.detailsSharing.openSnackBar(
              `Claims Attached Successfully.`,
              'Dismiss',
              false
            );
            this.detailsSharing.reloadSingleInvestigation.next(
              this.investigationNumber
            );
            this.dialogRef.close();
          }
        }
      });
  }
}
