import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  IconDefinition,
  faEye,
  faFilter,
  faPlusSquare,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Claim } from '../Models/claim';
import { FormControl } from '@angular/forms';
import { ClaimsService } from '../Services/claims-service.service';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateHelper } from 'src/app/shared/class/date-helper';
import { AddInvestigationPopupComponent } from 'src/app/shared/Modals/add-investigation-popup/add-investigation-popup.component';
import { ViewClaimsDetailsPopupComponent } from 'src/app/shared/Modals/view-claims-details-popup/view-claims-details-popup.component';
import { ClaimDetailsPopupComponent } from 'src/app/shared/Modals/claim-details-popup/claim-details-popup.component';
import { ClaimsDetailsModel } from 'src/app/shared/models/claims-details.model';
import { StateManagementService } from 'src/app/core/services/state-management.service';
import { MiscInfoComponent } from '../modals/misc-info/misc-info.component';

@Component({
  selector: 'cwb-claims-details',
  templateUrl: './claims-details.component.html',
  styleUrls: ['./claims-details.component.' + environment.cwbTheme + '.scss'],
})
export class ClaimsDetailsComponent implements OnInit {
  currentPolicyNo: string;
  claimsDatasource = [];

  //displayed columns
  displayedColumns: string[];
  //icons
  faEye: IconDefinition = faEye;
  faFilter: IconDefinition = faFilter;
  faPlusSquare: IconDefinition = faPlusSquare;
  faInfoCircle = faInfoCircle;
  // boolean
  isTableHasData = true;
  isRowClicked = false;
  noRecords = false;
  isSingleClaim: boolean;
  loadingAllClaims = false;
  isClaimsTabClicked: boolean;
  totalResults: number;
  claimants: string[] = ['All Claimants'];
  policies = ['All Policies'];
  selectedPolicy = 'All Policies';
  selectedClaimant = 'All Claimants';
  filter;
  fromDate: Date;
  title = 'Claims';
  dataSource: MatTableDataSource<Claim>;
  expandedElement: any;
  dateCtrl = new FormControl();
  claimNoCtrl = new FormControl();
  providerCtrl = new FormControl();

  isAddInvestigation: boolean;

  private paginator: MatPaginator;
  private sort: MatSort;
  singleClaimNumber: string;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    if (this.paginator) {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  constructor(
    private claimsService: ClaimsService,
    private stateMgmt: StateManagementService,
    private cdr: ChangeDetectorRef,
    public detailsSharing: DetailsSharingService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnChanges() {
    this.isRowClicked = false;
    this.ngOnInit();
  }

  ngOnInit() {
    // this.isViewInvestigation = this.detailsSharing.permissionsCheck.isViewInvestigation;
    // this.isAddInvestigation = this.detailsSharing.permissionsCheck.isViewInvestigation;
    this.displayedColumns = ['expand', 'claimNum', 'claimDate', 'policyNo', 'name', 'diagnosis', 'benefitType', 'totalCharges', 'totalDeductible',
      'totalPaid', 'processedDate', 'receivedDate', 'pendCode', 'status','miscInfo'];
    if (this.detailsSharing.permissionsCheck.isViewInvestigation || this.detailsSharing.permissionsCheck.isViewNotes) {
      this.displayedColumns = [...this.displayedColumns, 'investigationTypes']
    }
    if (this.detailsSharing.permissionsCheck.isAddInvestigation || this.detailsSharing.permissionsCheck.isViewInvestigation || this.detailsSharing.permissionsCheck.isViewNotes) {
      this.displayedColumns = [...this.displayedColumns, 'actions']
    }
    this.detailsSharing.isClaimsTabClicked.subscribe((v) => {
      this.isClaimsTabClicked = v;
      if (v && !this.isSingleClaim) {
        this.getClaimsOrAssignClaims();
      }
    });
    this.getClaims();
  }

  // Method to get the claims
  getClaims() {
    this.route.queryParamMap.subscribe((params) => {
      const claimNo = params.get('claims');
      this.singleClaimNumber=claimNo;
      if (claimNo) {
        const claimDetails = this.stateMgmt.getClaimDetails();
        this.isSingleClaim = true;
        if (claimDetails != null) {
          this.assignClaimDetails();
        } else {
          this.getSingleClaimDetails(claimNo);
        }
      } else {
        this.isSingleClaim = false;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.currentPolicyNo = params.ctrlno;
      // if (!this.isSingleClaim) {
        this.getClaimsOrAssignClaims();
      // }
    });
  }

  // get the claims or assign the claims using state management
  getClaimsOrAssignClaims() {
    const claimDetails = this.stateMgmt.getClaimDetails();
    const invDetails = this.stateMgmt.getInvestigationTabDetails();
    if (claimDetails != null && !claimDetails.isNewInvAdded && !invDetails?.isInvUpdated) {
      this.assignClaimDetails();
    } else {
      if (this.isClaimsTabClicked || invDetails?.isInvUpdated) {
        if(this.isSingleClaim){
          this.getSingleClaimDetails(this.singleClaimNumber);
        }
        else{
          this.getClaimsDetails();
        }
      }
    }
  }

  // Assigning the claim details using state management
  assignClaimDetails() {
    const claimDetails = this.stateMgmt.getClaimDetails();
    this.isSingleClaim = claimDetails.isSingleClaim;
    this.claimsDatasource = claimDetails.claimsDatasource;
    this.noRecords = claimDetails.noRecords;
    this.currentPolicyNo = claimDetails.currentPolicyNo;
    this.assignDataSource();
    if (!this.isSingleClaim) {
      this.initializeFilters();
    }
  }

  // setting the claims details using state management
  assignClaimDetailsOnService() {
    const claimDetails: ClaimsDetailsModel = {
      claimsDatasource: this.claimsDatasource,
      isSingleClaim: this.isSingleClaim,
      noRecords: this.noRecords,
      currentPolicyNo: this.currentPolicyNo,
      isNewInvAdded: false,
    };
    this.stateMgmt.setClaimDetails(claimDetails);
  }
  // ngafterviewinit method for datasource
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.claimsDatasource);
    this.cdr.detectChanges();
  }

  // Assigning the datasource and its ather attributes
  assignDataSource() {
    this.dataSource = new MatTableDataSource(this.claimsDatasource);
    console.log("DATASOURCE",this.dataSource.data)
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.sort = this.sort;
    this.totalResults = this.claimsDatasource.length;
    this.fromDate = new Date(
      this.claimsDatasource[this.totalResults - 1].claimDate
    );
  }

  // method to get the single claim
  getSingleClaimDetails(claimNumber) {
    this.claimsService
      .getClaimsByClaimNumber(claimNumber)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.currentPolicyNo = response.data[0].policyNo;
          this.claimsDatasource = response.data;
          this.assignDataSource();
          this.noRecords = false;
          this.isSingleClaim = true;
          this.assignClaimDetailsOnService();
        } else {
          this.noRecords = true;
          this.assignClaimDetailsOnService();
          this.detailsSharing.openSnackBar(
            `Sorry Claim Number: ${claimNumber} was not found. Please try again.`,
            'Dismiss',
            true
          );
        }
      });
  }

  // method to get the claim details using the service call
  getClaimsDetails() {
    this.claimsService
      .getPaginatedClaims(this.currentPolicyNo, false)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.claimsDatasource = response.data;
          this.assignDataSource();
          this.noRecords = false;
          this.loadingAllClaims = false;
          this.isSingleClaim = false;
          this.initializeFilters();
          this.assignClaimDetailsOnService();
        } else {
          this.noRecords = true;
          this.assignClaimDetailsOnService();
          this.cdr.detectChanges();
        }
      });
  }

  // initializing the filter values of claims
  initializeFilters() {
    this.claimants = ['All Claimants'];
    for (const element of this.claimsDatasource) {
      if (!this.claimants.includes(element.name)) {
        this.claimants.push(element.name);
      }
    }
    this.policies = ['All Policies'];
    for (const element of this.claimsDatasource) {
      if (!this.policies.includes(element.policyNo)) {
        this.policies.push(element.policyNo);
      }
    }
    this.dataSource.filterPredicate = ((data, filter) => {
      const a =
        !filter.claimNum ||
        data.claimNum.toLowerCase().includes(filter.claimNum);
      const b = !filter.name || data.name.toLowerCase().includes(filter.name);
      const c =
        !filter.policyNo ||
        data.policyNo.toLowerCase().includes(filter.policyNo);
      const d =
        !filter.claimDate ||
        DateHelper.verifyDatesEqual(data.claimDate, filter.claimDate);
      const e = !filter.provider || this.checkProviderFilter(data, filter);
      return a && b && c && d && e;
    }) as (ClaimsDetails, string) => boolean;
  }

  // method to check the provider filter
  checkProviderFilter(data, filter) {
    for (const element of data.lineItems) {
      if (element.providerName.toLowerCase().includes(filter.provider)) {
        return true;
      }
    }
  }

  // method on click of view claims
  onViewAllClaims() {
    this.loadingAllClaims = true;
    this.getClaimsDetails();
  }

  // method to reset the claims screen
  onReset() {
    this.selectedClaimant = 'All Claimants';
    this.selectedPolicy = 'All Policies';
    this.claimNoCtrl.reset();
    this.dateCtrl.reset();
    this.providerCtrl.reset();
    this.isTableHasData = true;
    this.totalResults = this.dataSource.data.length;
    this.applyFilter('', 6);
  }

  // method to  filter out the claims based on the filter selected
  applyFilter(event: string, i: number) {
    let filterValue;
    if (i === 1) {
      if (event === 'All Claimants') {
        filterValue = '';
      } else {
        filterValue = event;
      }
      this.filter = {
        ...this.filter,
        name: filterValue.trim().toLowerCase(),
      } as string;
    }
    if (i === 2) {
      const d = new Date(event);
      this.filter = { ...this.filter, claimDate: d } as string;
    }
    if (i === 3) {
      this.filter = {
        ...this.filter,
        claimNum: event.trim().toLowerCase(),
      } as string;
    }
    if (i === 5) {
      if (event === 'All Policies') {
        filterValue = '';
      } else {
        filterValue = event;
      }
      this.filter = {
        ...this.filter,
        policyNo: filterValue.trim().toLowerCase(),
      } as string;
    }
    if (i === 6) {
      this.filter = {} as string;
    }
    if (i === 7) {
      filterValue = event;
      this.filter = {
        ...this.filter,
        provider: filterValue.trim().toLowerCase(),
      } as string;
    }
    this.dataSource.filter = this.filter;
    if (i != 6) {
      this.totalResults = this.dataSource.filteredData.length;
      if (this.dataSource.filteredData.length > 0) {
        this.isTableHasData = true;
      } else {
        this.isTableHasData = false;
      }
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClaimThruDate(claimNum: string): Date {
    let thruDate: Date = null;
    const curClaim = this.claimsDatasource.find((x) => x.claimNum === claimNum);

    if (curClaim !== null) {
      if (
        new Date(curClaim.claimThruDate.toString()).getTime() >
        new Date(curClaim.claimDate).getTime()
      ) {
        thruDate = curClaim.claimThruDate;
      }
    }

    return thruDate;
  }

  // method to add new investigation
  OnAddInvestigation(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-investigation-popup';
    dialogConfig.data = {
      claimNumber: row.claimNum,
      claimantName: row.name,
      onInvestigations: false,
      policyEffectiveDate: this.detailsSharing.policyEffectiveDate,
    };
    this.dialog.open(AddInvestigationPopupComponent, dialogConfig);
  }

  // method to view the claim details
  viewClaimsDetails(row: Claim) {
    if (row.investigationTypes.includes(',')) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'cwb-view-claims-details-popup';
      dialogConfig.data = {
        claimNumber: row.claimNum,
        claimantName: row.name,
      };
      this.dialog.open(ViewClaimsDetailsPopupComponent, dialogConfig);
    } else {
      this.detailsSharing.invName = row.name;
      this.detailsSharing.invClaimNumber = row.claimNum;
      this.detailsSharing.invForRoute.next({
        name: row.claimNum,
        query: 'invId',
        value: false,
      });
      this.stateMgmt.setInvestigationDetails(null);
      this.router.navigate(['investigations', row.claimNum], {
        queryParams: {
          invId: 'false',
        },
      });
    }
  }
  // opens the popup for the misc info
  onViewMiscInfo(row: Claim) {
    this.claimsService
      .getMiscInfo(row.policyNo, row.claimNum)
      .subscribe((response) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'cwb-misc-info-popup';
        dialogConfig.data = {
          claimNum: row.claimNum,
          policyNo: row.policyNo,
          miscInfo: response.data,
        };
        this.dialog.open(MiscInfoComponent, dialogConfig);
      });
  }

  // method to view the claims details on each individual rows
  onClaimDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'ccwb-claim-details-popup';
    dialogConfig.data = {
      claimNumber: row.claimNum,
      diagnosis: row.diagnosis,
    };
    this.dialog.open(ClaimDetailsPopupComponent, dialogConfig);
  }
}
