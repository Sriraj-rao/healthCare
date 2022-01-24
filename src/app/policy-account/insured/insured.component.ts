import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InsuredService } from './services/insured.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CoverageSummary } from './models/coverage-summary.model';
import { DetailsSharingService } from '../../core/services/details-sharing.service';
import { environment } from 'src/environments/environment';
import { InsuredDetailsModel } from '../../shared/models/insured-details.model';
import { StateManagementService } from '../../core/services/state-management.service';

@Component({
  selector: 'cwb-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.' + environment.cwbTheme + '.scss'],
})
export class InsuredComponent implements OnInit {
  currentPolicyNo: string;
  title = 'Insured Details';
  distinctControlNos: string[] = [];
  coverageSummaries: CoverageSummary[];
  fromDate: Date;
  totalResults: number;
  noRecords = false;
  hasError = false;
  @Output() isNameClicked = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private stateMgmt: StateManagementService,
    public detailsSharing: DetailsSharingService,
    private insuredService: InsuredService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentPolicyNo = params.ctrlno;
      const insuredDetails = this.stateMgmt.getInsuredDetails();
      if (
        insuredDetails != null &&
        this.currentPolicyNo === insuredDetails.currentPolicyNo
      ) {
        this.assignInsuredValues(insuredDetails);
      } else {
        this.getInsuredCoverageSummaries();
      }
    });
  }

  // Assigning the insured details to the variables
  assignInsuredValues(insuredDetails: InsuredDetailsModel) {
    this.currentPolicyNo = insuredDetails.currentPolicyNo;
    this.coverageSummaries = insuredDetails.coverageSummaries;
    this.fromDate = insuredDetails.fromDate;
    this.totalResults = insuredDetails.totalResults;
    this.noRecords = insuredDetails.noRecords;
  }

  // Method to call the service to fetch the insured coverage summaries
  getInsuredCoverageSummaries() {
    this.insuredService
      .getInsuredCoverageSummaries(this.currentPolicyNo)
      .subscribe(
        (response) => {
          if (response.data.length > 0) {
            if (this.getDistinctControlNumbers(response.data).length > 1) {
              const bpControlNo = response.data[0].controlNo;
              response.data.forEach((x) => {
                if (
                  !this.distinctControlNos.includes(x.controlNo) &&
                  x.controlNo !== bpControlNo
                ) {
                  this.distinctControlNos.push(x.controlNo);

                  x.highlightControlNo = true;
                }
              });
            }
            this.noRecords = false;
            this.coverageSummaries = response.data;
            this.detailsSharing.policyEffectiveDate =
              this.coverageSummaries[0].insuredCoverages[0].effectiveDate;
            this.totalResults = this.coverageSummaries.length;
            this.fromDate = new Date(
              this.coverageSummaries[this.totalResults - 1].paidToDate
            );
            const insuredDetails: InsuredDetailsModel = {
              coverageSummaries: this.coverageSummaries,
              currentPolicyNo: this.currentPolicyNo,
              fromDate: this.fromDate,
              noRecords: false,
              totalResults: this.totalResults,
            };
            this.stateMgmt.setInsuredDetails(insuredDetails);
          } else {
            this.noRecords = true;
          }
        },
        () => {
          this.hasError = true;
        }
      );
  }

  // Reloading the insured screen
  onReloadInsured() {
    this.ngOnInit();
  }

  // to check whether the name is clicked or not
  onNameClicked() {
    this.isNameClicked.emit(true);
  }

  // Gets a list of distinct control numbers
  getDistinctControlNumbers(coverageSummaries: CoverageSummary[]): string[] {
    if (coverageSummaries === null) {
      return [];
    } else {
      const ctrlNums = new Set(coverageSummaries.map((x) => x.controlNo));
      return Array.from(ctrlNums);
    }
  }
}
