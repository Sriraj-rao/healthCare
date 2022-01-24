import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { StateManagementService } from 'src/app/core/services/state-management.service';

@Component({
  selector: 'cwb-view-claims-details-popup',
  templateUrl: './view-claims-details-popup.component.html',
  styleUrls: ['./view-claims-details-popup.component.scss']
})
export class ViewClaimsDetailsPopupComponent implements OnInit, AfterViewInit {
  constructor(public claimsService: ClaimsService, private stateMgmt: StateManagementService, private detailsSharing: DetailsSharingService,
              public dialogRef: MatDialogRef<ViewClaimsDetailsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public claimsData: { claimNumber: string, claimantName: string }, private router: Router) { }


  data = this.claimsData;
  dataSource;
  viewClaimsData = [];
  claimNumber = this.claimsData.claimNumber;
  claimantName = this.claimsData.claimantName;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  displayedColumns: string[] = ['number', 'investigationSubCategory', 'investigationStatus'];

  ngOnInit(): void {
    this.getClaimsDetails();
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }
  // gets the claim details using a service call by passing a claim number as a parameter
  getClaimsDetails() {

    this.claimsService.getViewClaimsByClaimNumber(this.claimNumber).subscribe(
      response => {
        this.viewClaimsData = response.data;
        this.dataSource = new MatTableDataSource(this.viewClaimsData);
        this.dataSource.sort = this.sort;
      });
  }
// navigates to investigation screen based on investigation id selected
  onInvIdClicked(investigationId) {
    this.detailsSharing.invName = this.claimantName;
    this.detailsSharing.invClaimNumber = this.claimNumber;
    this.detailsSharing.invForRoute.next({
      name: investigationId,
      query: 'invId',
      value: true
    });
    this.stateMgmt.setInvestigationDetails(null);
    this.router.navigate(['investigations', investigationId], {
      queryParams: {
        invId: true
      }
    });
    this.dialogRef.close();
  }
  // views all investigations and routes to investigation screen
  onViewAll() {
    this.detailsSharing.invName = this.claimantName;
    this.detailsSharing.invClaimNumber = this.claimNumber;
    this.detailsSharing.invForRoute.next({
      name: this.claimNumber,
      query: 'invId',
      value: false
    });
    this.stateMgmt.setInvestigationDetails(null);
    this.router.navigate(['investigations', this.claimNumber], {
      queryParams: {
        invId: false
      }
    });
    this.dialogRef.close();
  }


}
