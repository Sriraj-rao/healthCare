import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  IconDefinition,
  faFileMedical,
  faFileAlt,
  faFileDownload
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentService } from '../services/document.service';
import { MiscellaneousDocumentsModel } from '../models/miscellaneous-documents.model';
import { MatTableDataSource } from '@angular/material/table';
import { AttachMiscDocumentPopupComponent } from '../modals/attach-misc-document-popup/attach-misc-document-popup.component';
import { MatSort } from '@angular/material/sort';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { environment } from 'src/environments/environment';
import { MiscDocumentDetails } from 'src/app/shared/models/misc-doc-details.model';
import { StateManagementService } from 'src/app/core/services/state-management.service';
import { DocFileIds } from '../models/doc-file-ids.model';

@Component({
  selector: 'cwb-miscellaneous-documents',
  templateUrl: './miscellaneous-documents.component.html',
  styleUrls: ['./miscellaneous-documents.component.scss'],
})
export class MiscellaneousDocumentsComponent implements OnInit {
  // icons
  faFileMedical: IconDefinition = faFileMedical;
  faTrashAlt: IconDefinition = faTrashAlt;
  faFileAlt: IconDefinition = faFileAlt;
  faFileDownload = faFileDownload;
  @Input() investigationId: number;
  @Input() investigationNumber: string;
  @Output() miscDocCountEmitter = new EventEmitter<number>();

  miscDocuments: MiscellaneousDocumentsModel[];
  dataSource;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  constructor(
    public dialog: MatDialog,
    private docService: DocumentService,
    private stateMgmt: StateManagementService,
    private detailsSharing: DetailsSharingService
  ) { }

  displayedColumns: string[];

  ngOnInit(): void {
    this.displayedColumns= ['documentNumber','name','receivedDate','deliveryMethod'];
    if(this.detailsSharing.permissionsCheck?.isDownloadMiscDocument || this.detailsSharing.permissionsCheck?.isAttachMiscDocument || this.detailsSharing.permissionsCheck?.isDeleteMiscDocument){
      this.displayedColumns=[...this.displayedColumns,'actions']
    }
    this.getMiscellaneousDocuments();
  }
  // gets the miscellaneous document using service call by passing investigation id as a parameter
  getMiscellaneousDocuments() {
    this.docService
      .getMiscellaneousDocuments(this.investigationId)
      .subscribe((response) => {
        if (response.data) {
          this.miscDocuments = response.data;
          this.setDocumentRequestsOnService();
          this.dataSource = new MatTableDataSource(this.miscDocuments);
          this.dataSource.sort = this.sort;
          this.miscDocCountEmitter.emit(this.miscDocuments.length);
        }
      });
  }

  // sets the document request values
  setDocumentRequestsOnService() {
    const documentRequestDetails: MiscDocumentDetails = {
      investigationNumber: this.investigationNumber,
      miscDocuments: this.miscDocuments,
    };
    this.stateMgmt.setMiscDocumentDetails(documentRequestDetails);
  }

  // sets the document request
  setDocumentRequests(documentRequestDetails: MiscDocumentDetails) {
    this.miscDocuments = documentRequestDetails.miscDocuments;
    this.dataSource = new MatTableDataSource(this.miscDocuments);
    this.dataSource.sort = this.sort;
    this.miscDocCountEmitter.emit(this.miscDocuments.length);
  }

// downloads the attached document
  onDownload(file: MiscellaneousDocumentsModel) {
    const docFileIds: DocFileIds = {
      fileId: file.fileId,
      fileName: file.name
    };
    this.detailsSharing.downloadSingleFile(docFileIds);
  }

  // opens the dialog for attaching miscellaneous documents
  onAttachMiscDoc(element: MiscellaneousDocumentsModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-claims-popup';
    dialogConfig.data = {
      documentId: element.documentId,
      investigationId: this.investigationId,
      invNumber: this.investigationNumber,
      isDenial: false
    };
    this.dialog.open(AttachMiscDocumentPopupComponent, dialogConfig);
  }

  // method to delete the miscellaneous document
  onDeleteMiscDoc(element: MiscellaneousDocumentsModel) {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to delete this document ?',
        false,
        'deleteDoc'
      )
      .dialog.subscribe(() => {
        if (this.detailsSharing.alertDialogData.submit) {
          const documentId = element.documentId;
          this.deleteDoc(documentId);
        }
      });
  }

  // api call for deleting the document
  deleteDoc(documentId: number) {
    this.docService.deleteDoc(documentId).subscribe((data) => {
      if (data) {
        this.detailsSharing.reloadSingleInvestigation.next(
          this.investigationNumber
        );
        this.detailsSharing.openSnackBar(
          `Document Deleted Successfully.`,
          'Dismiss',
          false
        );
      } else {
        this.detailsSharing.openSnackBar(
          `Document cannot be deleted.`,
          'Dismiss',
          true
        );
      }
    });
  }
}
