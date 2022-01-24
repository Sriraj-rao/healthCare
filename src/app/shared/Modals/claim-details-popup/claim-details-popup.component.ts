import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';
import { ClaimDetail } from '../Models/claim-detail';
import { ClaimDetailRx } from '../Models/claim-detail-rx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'cwb-claim-details-popup',
  templateUrl: './claim-details-popup.component.html',
  styleUrls: ['./claim-details-popup.component.scss'],
})
export class ClaimDetailsPopupComponent implements OnInit {
  constructor(
    public claimsService: ClaimsService,
    public dialogRef: MatDialogRef<ClaimDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public claimsData: { claimNumber: string; diagnosis: string },
    private router: Router
  ) {}

  ClaimsData = [];
  claimNumber = this.claimsData.claimNumber;
  diagnosis = this.claimsData.diagnosis;
  currentClaimDetail: {
    diagnosis: string;
    details: any[];
  } = {
    diagnosis: '',
    details: [],
  };
  currentClaimDetailPage: any[];

  detailPageNumber: number;

  ngOnInit(): void {
    this.getClaimantDetails();
  }

  // Determines if the diagnosis is a RX diagnosis
  isRxDiagnosis(diagnosis: string): boolean {
    if (diagnosis === null || diagnosis === undefined) {
      return false;
    }

    return diagnosis.toUpperCase().trim() === 'Z760';
  }

  // Event handler for when a user selects to show claim details
  getClaimantDetails() {
    {
      this.claimsService
        .getViewClaimDetailsByClaimNumber(this.claimNumber)
        .subscribe((response) => {
          this.currentClaimDetail.diagnosis = this.diagnosis;
          this.currentClaimDetail.details = this.isRxDiagnosis(this.diagnosis)
            ? (response.data as ClaimDetailRx[])
            : (response.data as ClaimDetail[]);
          this.currentClaimDetailPage = this.currentClaimDetail.details.slice(
            0,
            1
          );
        });
    }
  }

  // Event handler for paging claim details
  public onPageChanged(event: PageEvent): PageEvent {
    const lowValue = event.pageIndex * event.pageSize;
    const highValue = (event.pageIndex + 1) * event.pageSize;
    this.currentClaimDetailPage = this.currentClaimDetail.details.slice(
      lowValue,
      highValue
    );

    this.detailPageNumber = event.pageIndex;

    return event;
  }
}
