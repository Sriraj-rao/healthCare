import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MiscInfoModalInjected } from '../../Models/Injected/misc-info-injected.model';
import { MatTableDataSource } from '@angular/material/table';
import { MiscInfoModel } from '../../Models/misc-info.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'cwb-misc-info',
  templateUrl: './misc-info.component.html',
  styleUrls: ['./misc-info.component.scss']
})
export class MiscInfoComponent implements OnInit {
  dataSource: MatTableDataSource<MiscInfoModel>;
  displayedColumns: string[] = ['recordNo', 'description'];

  private paginator: MatPaginator;
  private sort: MatSort;

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
  constructor(public dialogRef: MatDialogRef<MiscInfoComponent>, @Inject(MAT_DIALOG_DATA)
  public miscData: MiscInfoModalInjected) { }

  ngOnInit(): void {
    this.assignDataSource();
  }
// assigns the values of the datasource for the respective variables
  assignDataSource() {
    this.dataSource = new MatTableDataSource(this.miscData.miscInfo);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.sort = this.sort;
  }

}
