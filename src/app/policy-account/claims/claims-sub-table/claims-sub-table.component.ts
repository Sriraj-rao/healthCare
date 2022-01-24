import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ClaimLineItem } from '../Models/claim-line-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cwb-claims-sub-table',
  templateUrl: './claims-sub-table.component.html',
  styleUrls: ['./claims-sub-table.component.' + environment.cwbTheme + '.scss'],
})
export class ClaimsSubTableComponent implements OnInit, OnChanges {
  @Input() claimsExpandedData: ClaimLineItem[] = [];
  displayedColumns: string[] = [
    'line',
    'diagnosis',
    'provider',
    'benefitType',
    'procedureCode',
    'amountCharged',
    'ppdDiscount',
    'deductibleApplied',
    'paidAmount',
    'assignmentIndicator',
    'remarkCodes',
  ];
  dataSource: MatTableDataSource<ClaimLineItem>;

  constructor() {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.claimsExpandedData);
  }

  ngOnInit(): void {}

  // Summary of remark codes
  // List of remark codes from current line item
  getRemarkCodesSummary(remarkCodes: string[]): string {
    const codes = remarkCodes.filter((c) => c !== '' && c !== null);

    return codes.join(', ');
  }

  // Gets the remark code and definition summary
  getRemarksSummary(element: ClaimLineItem): string {
    const remarkSummaries: string[] = [];

    if (element.remarkDesc1 !== null && element.remarkDesc1 !== '') {
      remarkSummaries.push(`${element.remarkCode1} - ${element.remarkDesc1}`);
    }

    if (element.remarkDesc2 !== null && element.remarkDesc2 !== '') {
      remarkSummaries.push(`${element.remarkCode2} - ${element.remarkDesc2}`);
    }

    return remarkSummaries.join('; ');
  }
}
