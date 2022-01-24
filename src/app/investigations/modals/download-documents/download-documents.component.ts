import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DocFileIds } from '../../models/doc-file-ids.model';
import { faFileAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cwb-download-documents',
  templateUrl: './download-documents.component.html',
  styleUrls: ['./download-documents.component.scss'],
})
export class DownloadDocumentsComponent implements OnInit {
  // icons
  faFileAlt = faFileAlt;
  faDownload = faDownload;

  postData;
  alreadyExistingTemplateId: string;
  // boolean
  isPreviewDocument: boolean;
  checkboxIsClicked = false;
  urls: string[] = [];
  tableFileId: any;

  constructor(public dialogRef: MatDialogRef<DownloadDocumentsComponent>, public detailsSharing: DetailsSharingService,
              @Inject(MAT_DIALOG_DATA) public downloadDocumentData: { docFileIds: DocFileIds[] }) { }

  ngOnInit(): void {
  }


  // method to download documents
  onSubmit() {
    this.detailsSharing.downloadAll(this.downloadDocumentData.docFileIds);
  }

  onTemplateIdEmitted($event) {}

  // method to preiview the document
  onPreviewDocument(fileId) {
    if (fileId) {
      this.tableFileId = fileId;
      if (this.isPreviewDocument) {
      } else {
        this.isPreviewDocument = true;
      }
    }
  }

  // method on all checkbox are selected
  onAllCheckbocClicked(event) {
    if (event === true) {
      this.checkboxIsClicked = true;
    }
    else {
      this.checkboxIsClicked = false;
    }
  }

  // method on single checkbox is clicked
  onCheckboxClicked(event) {
    if (event === true) {
      this.checkboxIsClicked = true;
    }
    else {
      this.checkboxIsClicked = false;
    }
  }

  // closes the preview document
  onPreviewClose() {
    this.isPreviewDocument = false;
  }
}
