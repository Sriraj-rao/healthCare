import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  faFileUpload,
  faFileDownload,
  faFileAlt,
  faFileMedical,
  faBell,
  faUpload,
  faBinoculars,
  faNotesMedical,
  faFileImport,
  faFileExport,
  faDownload,
  faMinus,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DocumentService } from '../services/document.service';
import { DocumentRequestsModel } from '../models/document-requests.model';
import { UploadDocumentPopupComponent } from '../modals/upload-document-popup/upload-document-popup.component';
import { DocumentRequestStateDetails } from 'src/app/shared/models/document-request-details.model';
import { DocFileIds } from '../models/doc-file-ids.model';
import { DownloadDocumentsComponent } from '../modals/download-documents/download-documents.component';
import { NotesModel } from '../Notes/models/notes.model';

import { AddNewNotesPopupComponent } from '../Notes/modals/add-new-notes-popup/add-new-notes-popup.component';
import { ViewDocNotesComponent } from '../Notes/modals/view-doc-notes/view-doc-notes.component';
import { FileViewerComponent } from 'src/app/shared/file-viewer/file-viewer.component';
import { InvestigationModel } from '../models/investigation.model';
import { StateManagementService } from 'src/app/core/services/state-management.service';

@Component({
  selector: 'cwb-document-requests',
  templateUrl: './document-requests.component.html',
  styleUrls: ['./document-requests.component.scss'],
})
export class DocumentRequestsComponent implements OnInit {
  // boolean
  panelOpenState = false;
  isScrolled: boolean;

  // icons
  faFileUpload = faFileUpload;
  faUpload = faUpload;
  faEye = faEye;
  faFileDownload = faFileDownload;
  faFileImport = faFileImport;
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faMinus = faMinus;
  faFileExport = faFileExport;
  faBinoculars = faBinoculars;
  faNotesMedical = faNotesMedical;
  faFileMedical = faFileMedical;
  faBell = faBell;
  faFileExcel = faFileExcel;

  @Input() investigationId: number;
  @Input() investigationNumber: string;
  @Input() investigationType: string;
  @Input() policyNo: string;
  @Input() claimNo: string;
  @Input() isDenial: boolean;
  @Input() isOpen: boolean;
  @Input() investigationGroupId: number;
  @Input() parentInvestigationDetail: InvestigationModel;

  @Output() docRequestsCountEmitter = new EventEmitter<number>();
  @Output() addDocRequestsCountEmitter = new EventEmitter<number>();
  isRowExpanded = false;
  allDocRequests: DocumentRequestsModel[];
  dataByReqType: DocumentRequestsModel[][];
  displayedColumns: string[] = [
    // 'requestType',
    'requestID',
    'requests',
    'providerName',
    'requestDate',
    'receivedDate',
    'notes',
  ];

  displayedDenialColumns: string[] = [
    // 'requestType',
    'requestID',
    'requestDate',
    'createdBy',
    'document',
   
  ];
  policeReportDetails: any[] = [];
  primaryCareDetails: any[] = [];

  notesDetails: NotesModel[] = [];

  @Input() isInvestigationExpanded: boolean;
  requestId: number;
  dataSource;

  @Output() fileIdEmitter = new EventEmitter<number>();

  @ViewChild('reqTables') reqTables: ElementRef;
  @ViewChild('tableHeader') tableHeader: ElementRef;

  constructor(
    public dialog: MatDialog,
    public detailsSharing: DetailsSharingService,
    private stateMgmt: StateManagementService,
    private docService: DocumentService
  ) {}

  ngOnInit(): void {
    if(this.detailsSharing.permissionsCheck?.isUploadDocument || this.detailsSharing.permissionsCheck?.isViewSentDocument || this.detailsSharing.permissionsCheck?.isViewReceivedDocument){
      this.displayedColumns=[...this.displayedColumns,'document'];
    }
    if(this.detailsSharing.permissionsCheck?.isViewNotes || this.detailsSharing.permissionsCheck?.isAddNotes){
      this.displayedColumns=[...this.displayedColumns,'addNotes'];
      this.displayedDenialColumns=[...this.displayedDenialColumns,'addNotes'];
    }
    if(!this.isDenial&&this.detailsSharing.permissionsCheck?.isCloseRequest || this.detailsSharing.permissionsCheck?.isReminderRequest){
      this.displayedColumns=[...this.displayedColumns,'bell'];
    }
    if(this.isDenial){
      this.displayedColumns = [...this.displayedDenialColumns]
    }
    this.getDocumentRequestsByInvestigation();
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
  //   if (this.reqTables) {
  //     if (
  //       window.scrollY >= this.reqTables.nativeElement.offsetTop - 300 &&
  //       window.scrollY <
  //         this.reqTables.nativeElement.offsetHeight +
  //           this.reqTables.nativeElement.offsetTop -
  //           300
  //     ) {
  //       this.isScrolled = true;
  //       this.tableHeader.nativeElement.setAttribute(
  //         'style',
  //         'width:' + this.reqTables.nativeElement.offsetWidth + 'px'
  //       );
  //       this.reqTables.nativeElement.setAttribute(
  //         'style',
  //         'margin-top:' + 160 + 'px'
  //       );
  //     } else {
  //       this.isScrolled = false;
  //       this.reqTables.nativeElement.setAttribute(
  //         'style',
  //         'margin-top:' + 0 + 'px'
  //       );
  //     }
  //   }
  // }

  // gets the document request using investigation id from a service call
  getDocumentRequestsByInvestigation() {
    this.docService
      .getDocumentRequestsByInvestigation(this.investigationId, this.isDenial)
      .subscribe((response) => {
        if (response) {
          console.log(this.isDenial, response.data);
          this.allDocRequests = response.data;
          this.sortDataAccordingtoRequestType();
        }
      });
  }

   //previews the document
  onPreview(fileId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-preview-file-popup';
    dialogConfig.data = {
      fileId: fileId,
    };
    this.dialog.open(FileViewerComponent, dialogConfig);
  }

  onDownload(docFileId: DocFileIds) {
    console.log(docFileId);
    this.detailsSharing.downloadSingleFile(docFileId);
  }

  // sorts the document request
  setDocumentRequestsOnService() {
    const documentRequestDetails: DocumentRequestStateDetails = {
      investigationNumber: this.investigationNumber,
      dataByReqType: this.dataByReqType,
    };
    this.stateMgmt.setDocumentRequestDetails(documentRequestDetails);
  }

  // sets the values of document request
  setDocumentRequests(documentRequestDetails: DocumentRequestStateDetails) {
    this.dataByReqType = documentRequestDetails.dataByReqType;
    this.docRequestsCountEmitter.emit(this.dataByReqType.length);
  }

  // sorts the data according to request type
  sortDataAccordingtoRequestType() {
    this.dataByReqType = [];
    for (const i in this.allDocRequests) {
      let pushed = false;
      if (this.dataByReqType) {
        for (const x of this.dataByReqType) {
          if (x[0].requestType === this.allDocRequests[i].requestType) {
            x.push({ ...this.allDocRequests[i], panelOpenState: false });
            pushed = true;
          }
        }
      }
      if (!pushed) {
        this.dataByReqType = [
          ...this.dataByReqType,
          [{ ...this.allDocRequests[i], panelOpenState: false }],
        ];
      }
    }
    for (const x of this.dataByReqType) {
      x.sort((a, b) => {
        return +b.requestNumber.substring(2) - +a.requestNumber.substring(2);
      });
    }
    if (this.isDenial) {
      this.addDocRequestsCountEmitter.emit(this.dataByReqType.length);
    } else {
      this.docRequestsCountEmitter.emit(this.dataByReqType.length);
    }
    this.setDocumentRequestsOnService();
  }

  // downloads the doc files
  downloadFile(docFileIds: DocFileIds[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-claims-popup';
    dialogConfig.data = {
      docFileIds,
    };
    this.dialog.open(DownloadDocumentsComponent, dialogConfig);
  }

  // adds the new notes from document request
  addNewNotes(row) {
    this.requestId = row.requestId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-new-notes-popup';
    dialogConfig.data = {
      investigationId: this.investigationId,
      requestId: this.requestId,
      investigationGroupId: this.investigationGroupId,
      newNote: null,
      investigationNumber: this.investigationNumber,
    };
    this.dialog.open(AddNewNotesPopupComponent, dialogConfig);
  }

  // gives the ability to view the added notes on click of a button
  viewNotes(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-view-doc-notes';
    dialogConfig.data = {
      investigationGroupId: this.investigationGroupId,
      requestId: row.requestId,
      investigationId: this.investigationId,
    };
    this.dialog.open(ViewDocNotesComponent, dialogConfig);
  }

  // method to check whether requested file contains id
  isRequestedFileContainsId(element: DocumentRequestsModel) {
    let count = 0;
    for (const x of element.requestedDocFileIds) {
      if (x.fileId) {
        count = count + 1;
        break;
      }
    }
    if (count === 0) {
      return false;
    } else {
      return true;
    }
  }

  // method to check whether recieved file contains id
  isReceivedFileContainsId(element: DocumentRequestsModel) {
    let count = 0;
    for (const x of element.receivedDocFileIds) {
      if (x.fileId) {
        count = count + 1;
        break;
      }
    }
    if (count === 0) {
      return false;
    } else {
      return true;
    }
  }

  // sends the reminder from document request
  sendReminder(element: DocumentRequestsModel) {
    this.detailsSharing
      .openAlertBox(
        'Do you really want to resend document request ?',
        false,
        'editReminder',
        this.parentInvestigationDetail,
        element.number,
        element.requestId,
        this.investigationId,
        this.investigationNumber,
        this.investigationType,
        this.claimNo,
        this.policyNo
      )
      .dialog.subscribe((data) => {
        if (
          this.detailsSharing.alertDialogData.submit &&
          this.detailsSharing.alertDialogData.popup === 'editReminder'
        ) {
          this.docService
            .createNewReminderRequest(element.requestId)
            .subscribe((response) => {
              if (response) {
                this.detailsSharing.openSnackBar(
                  'Reminder Sent Successfully.',
                  'Dismiss',
                  false
                );
                // this.detailsSharing.isInvestigationPostRequestComplete.next(true);
                this.detailsSharing.reloadSingleInvestigation.next(
                  this.investigationNumber
                );
              } else {
                this.detailsSharing.openSnackBar(
                  'Reminder Could Not Be Sent.',
                  'Dismiss',
                  true
                );
              }
            });
        }
      });
  }

  // closes the document request
  closeRequest(element: DocumentRequestsModel) {
    this.detailsSharing
      .openAlertBox(
        'Do you really want to Close the document request ?',
        false,
        'close'
      )
      .dialog.subscribe((data) => {
        if (this.detailsSharing.alertDialogData.submit) {
          this.docService
            .closeRequest(element.requestId)
            .subscribe((response) => {
              if (response) {
                this.detailsSharing.openSnackBar(
                  'Request Closed Successfully.',
                  'Dismiss',
                  false
                );
                // this.detailsSharing.isInvestigationPostRequestComplete.next(true);
                this.detailsSharing.reloadSingleInvestigation.next(
                  this.investigationNumber
                );
              } else {
                this.detailsSharing.openSnackBar(
                  'Request  Could Not Be Closed.',
                  'Dismiss',
                  true
                );
              }
            });
        }
      });
  }

  // uploads the documents
  uploadDocument(element: DocumentRequestsModel) {
    if (!this.isReceivedFileContainsId(element) && element.isActive === true) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'cwb-add-claims-popup';
      dialogConfig.data = {
        requestId: element.requestId,
        requestType: element.requestType,
        templateId: element.templateId,
        investigationId: this.investigationId,
        claimNo: this.claimNo,
        policyNo: this.policyNo,
        invNumber: this.investigationNumber,
      };
      this.dialog.open(UploadDocumentPopupComponent, dialogConfig);
    }
  }
}
