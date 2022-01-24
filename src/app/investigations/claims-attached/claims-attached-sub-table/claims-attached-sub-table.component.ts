import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimLineItem } from 'src/app/policy-account/claims/Models/claim-line-item.model';

@Component({
  selector: 'cwb-claims-attached-sub-table',
  templateUrl: './claims-attached-sub-table.component.html',
  styleUrls: ['./claims-attached-sub-table.component.scss'],
})
export class ClaimsAttachedSubTableComponent implements OnInit {
  @Input() lineItems: ClaimLineItem[];
  @Input() diagnosis: string;
  @Input() diagnosisDesc: string;
  @Input() paidAs: string;
  @Input() decisionDate: string;
  @Input() showCloseDate: boolean;
  @Input() isOpen: boolean;
  provider: string;
  expandedDetail: any[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<ClaimLineItem>;
  constructor() {}

  ngOnInit(): void {
    this.getProviderNames();
    this.expandedDetail = [
      {
        diagnosis: this.diagnosis,
        diagnosisDesc: this.diagnosisDesc,
        providerName: this.provider,
        decisionDate: this.decisionDate,
        paidAs: this.paidAs,
      },
    ];
    this.dataSource = new MatTableDataSource(this.expandedDetail);
    if (this.showCloseDate) {
      this.displayedColumns = [
        'diagnosis',
        'providerName',
        'decisionDate',
        'paidAs',
      ];
    } else {
      this.displayedColumns = ['diagnosis', 'providerName'];
    }
  }

  // gets the provider names
  getProviderNames() {
    const providerNames = [];
    for (const x of this.lineItems) {
      if (!providerNames.includes(x.providerName)) {
        providerNames.push(x.providerName);
      }
    }
    let allNames = '';
    for (let i = 0; i < providerNames.length; i++) {
      if (i !== 0) {
        allNames = allNames + ',';
      }
      allNames = allNames + providerNames[i];
    }
    this.provider = allNames;
  }
}
