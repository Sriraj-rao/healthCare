import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cwb-insured-sub-table',
  templateUrl: './insured-sub-table.component.html',
  styleUrls: ['./insured-sub-table.component.' + environment.cwbTheme + '.scss']
})
export class InsuredSubTableComponent implements OnInit, OnChanges {

  @Input() riders;
  displayedColumns: string[] = ['insured', 'riderName'];
  dataSource: MatTableDataSource<any>;

  constructor() {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.riders);

  }

  ngOnInit(): void {
  }


}
