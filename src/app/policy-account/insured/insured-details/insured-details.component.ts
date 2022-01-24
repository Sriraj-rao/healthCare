import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CoverageSummary } from '../models/coverage-summary.model';
import { faLeaf, faSync } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { DateHelper } from 'src/app/shared/class/date-helper';

@Component({
  selector: 'cwb-insured-details',
  templateUrl: './insured-details.component.html',
  styleUrls: ['./insured-details.component.' + environment.cwbTheme + '.scss'],
  animations: [
    trigger('rowExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InsuredDetailsComponent implements OnInit, OnChanges {
  @Input() coverageSummaries: CoverageSummary[];
  @Input() currentPolicyNo: string;
  @Input() noRecords: boolean;
  @Input() totalResults: number;
  @Input() fromDate: Date;
  @Output() reloadEmitter = new EventEmitter<boolean>();
  @Output() isNameClicked = new EventEmitter<boolean>();

  // icons
  faLeaf = faLeaf;
  faSync = faSync;
  // display column
  displayedColumns: string[] = ['expand', 'insured', 'memberId', 'status', 'relationship', 'gender', 'dob', 'age', 'applicationDate', 'settleDate', 'effectiveDate', 'lapseDate', 'reIssueDate', 'termDate'];
  dataSource = new MatTableDataSource();
  expandedElement: any;
  // boolean
  isRowClicked = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
  }

  // To check whether the name is clicked or not
  onNameClicked() {
    this.isNameClicked.emit(true);
  }

   /** Indicator if the plan's paid to date is past due */
  overduePTD(coverageSummary): boolean {
    const ptd = DateHelper.toDate(coverageSummary.paidToDate);
    return ptd < new Date();
  }

  /** Indicator if the plan is participating in the paperless document plan */
  isPaperless(coverageSummary): boolean {
    let isPaperless = false;

    if (coverageSummary.paperlessIndicator !== null) {
      if (coverageSummary.paperlessIndicator.trim() !== '') {
        isPaperless = coverageSummary.paperlessIndicator.trim().toUpperCase() === 'Y' && coverageSummary.policyPublished ? true : false;
      }
    }

    return isPaperless;
  }

  // Reload the insured screen
  onReloadInsured(){
    this.reloadEmitter.emit(true);
  }

}
