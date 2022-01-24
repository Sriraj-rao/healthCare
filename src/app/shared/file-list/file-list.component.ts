import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { DocFileIds } from 'src/app/investigations/models/doc-file-ids.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { faEye, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';

@Component({
  selector: 'cwb-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  @Input() fileLists: DocFileIds[];
  @Input() showRequestNumber: boolean;
  allCheckboxSelected = false;
  faEye = faEye;
  faFileDownload = faFileDownload;
  displayedColumns: string[];
  dataSource: MatTableDataSource<DocFileIds>;
  private sort: MatSort;
  @Output() checkboxClickedEmiter = new EventEmitter<boolean>();
  @Output() allCheckboxClickedEmiter = new EventEmitter<boolean>();

  @Output() fileIdEmitter = new EventEmitter<number>();

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  constructor(private detailsSharing: DetailsSharingService) { }

  ngOnInit(): void {

    if (this.showRequestNumber){
      this.displayedColumns = ['checkbox', 'fileName', 'requestNumber', 'fileDate', 'view', 'download'];
    }
    else{
      this.displayedColumns = ['checkbox', 'fileName', 'fileDate', 'view', 'download'];
    }
    this.dataSource = new MatTableDataSource(this.fileLists);
    this.assignCheckboxes();
  }

  // assigns the checbox when checked
  assignCheckboxes(){
    for (const x of this.fileLists) {
      x.isCheckboxClicked = false;
    }
  }
// checks all the checkbox when the master checkbox is checked
  onAllCheckboxChanged() {
    this.allCheckboxSelected = !this.allCheckboxSelected;
    for (const x of this.fileLists) {
      x.isCheckboxClicked = this.allCheckboxSelected;
    }
    this.allCheckboxClickedEmiter.emit(this.allCheckboxSelected);

  }
// checks the individual checkbox when particular checkbox is checked
  onCheckboxChanged(i) {
    this.fileLists[i].isCheckboxClicked = !this.fileLists[i].isCheckboxClicked;
    this.checkboxClickedEmiter.emit(this.fileLists[i].isCheckboxClicked);
  }
// previews the document
  onPreview(fileId: number){
    this.fileIdEmitter.emit(fileId);
  }
// downloads the checked document
  onDownload(docFileId: DocFileIds) {
    this.detailsSharing.downloadSingleFile(docFileId);
  }

}
