import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { InvestigationModel } from '../../investigations/models/investigation.model';
import { InvestigationsService } from '../../investigations/services/investigation.service';
import { DetailsSharingService } from '../../core/services/details-sharing.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { StateManagementService } from '../../core/services/state-management.service';
import { Router } from '@angular/router';
import { InvestigationTabDetails } from '../../shared/models/investigation-tab-details.model';

@Component({
  selector: 'cwb-investigations-tab',
  templateUrl: './investigations-tab.component.html',
  styleUrls: ['./investigations-tab.component.scss'],
})
export class InvestigationsTabComponent implements OnInit, OnChanges {
  faEye = faEye;

  investigations: InvestigationModel[];
  @Input() policyNo: string;
  noInvestigations;
  isTableHasData = true;
  dataSource: MatTableDataSource<InvestigationModel>;
  displayedColumns: string[] = [
    'number',
    'investigationSubCategory',
    'investigationCategory',
    'investigationStatus',
    'lastActivity',
    'pendCode',
    'proofOfLoss',
    'age',
    'totalCharges',
    'totalAmountAfterDiscount',
    'effectiveDate',
    'view',
  ];

  private paginator: MatPaginator;
  private sort: MatSort;
  totalResults: number;
  fromDate: Date;
  isInvClicked: boolean;

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
    private invService: InvestigationsService,
    public detailsSharing: DetailsSharingService,
    private stateMgmt: StateManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detailsSharing.isInvestigationTabClicked.subscribe((response) => {
      if (response) {
        this.isInvClicked = response;
        this.getOrAssignInv();
      }
    });
    this.getOrAssignInv();
  }

  ngOnChanges() {}

  getOrAssignInv() {
    const invDetails = this.stateMgmt.getInvestigationTabDetails();
    if (invDetails && invDetails != null) {
      if (invDetails.isInvUpdated) {
        // if (this.isInvClicked) {
          this.getInvestigationsByPolicyNumber();
        // }
      } else {
        if (invDetails.policyNo === this.policyNo) {
          this.assignInvestigationDetails();
        } else {
          this.getInvestigationsByPolicyNumber();
        }
      }
    } else {
      if (this.isInvClicked) {
        this.getInvestigationsByPolicyNumber();
      }
    }
  }

  // assigns the investigation details that has to be displayed in investigation tab
  assignInvestigationDetails() {
    const investigationDetails = this.stateMgmt.getInvestigationTabDetails();
    this.investigations = investigationDetails.investigations;
    this.noInvestigations = investigationDetails.noInvestigations;
    this.policyNo = investigationDetails.policyNo;
    this.assignDataSource();
  }
  // assigns the details of the investigation to a variable
  assignInvestigationDetailsOnService() {
    const investigationDetails: InvestigationTabDetails = {
      investigations: this.investigations,
      noInvestigations: this.noInvestigations,
      policyNo: this.policyNo,
      isInvUpdated: false,
    };
    this.stateMgmt.setInvestigationTabDetails(investigationDetails);
  }
  // gets the investigations using a service call by passing policy no as a parameter
  getInvestigationsByPolicyNumber() {
    this.invService
      .getInvestigationsByPolicyNo(this.policyNo)
      .subscribe((response) => {
        if (response.data) {
          this.investigations = response.data;
          if (this.investigations.length > 0) {
            this.noInvestigations = false;
          } else {
            this.noInvestigations = true;
          }
          this.assignDataSource();
          this.assignInvestigationDetailsOnService();
        } else {
          this.noInvestigations = true;
          this.assignInvestigationDetailsOnService();
        }
      });
  }
  // assigns the properties of the datasoure to the respective variables
  assignDataSource() {
    this.dataSource = new MatTableDataSource(this.investigations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.totalResults = this.investigations.length;
    this.fromDate = new Date(
      this.investigations[this.totalResults - 1].effectiveDate
    );
  }

  // provides the ability to view the selected investigation by redirecting to investigation screen
  onViewClicked(element: InvestigationModel) {
    this.detailsSharing.invName = element.claimant;
    this.detailsSharing.invClaimNumber = element.claimNum;
    this.detailsSharing.invForRoute.next({
      name: element.number,
      query: 'invId',
      value: true,
    });
    this.stateMgmt.setInvestigationDetails(null);
    this.router.navigate(['investigations', element.number], {
      queryParams: {
        invId: true,
      },
    });
  }
}
