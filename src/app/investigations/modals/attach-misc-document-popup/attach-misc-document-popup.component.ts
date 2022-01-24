import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import {
  RequestTypeDropdownModel,
  RequestTypesModel,
} from '../../models/doc-rquest-dropdowns.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttachMiscllaneousDocumentToRequestModel } from '../../models/attach-misc-doc.model';
import { AttachMiscDocInjectedData } from '../../models/modals-injected-models/attach-misc-doc-injected.model';

@Component({
  selector: 'cwb-attach-misc-document-popup',
  templateUrl: './attach-misc-document-popup.component.html',
  styleUrls: ['./attach-misc-document-popup.component.scss'],
})
export class AttachMiscDocumentPopupComponent implements OnInit {
  requests: RequestTypesModel[];
  docTypes: RequestTypeDropdownModel[];
  uploadForm: FormGroup;

  // boolean
  isSubmitClicked = false;
  isDocTypeSelected = false;
  constructor(
    public dialogRef: MatDialogRef<AttachMiscDocumentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public uploadDocData: AttachMiscDocInjectedData,
    private docService: DocumentService,
    private formBuilder: FormBuilder,
    private detailsSharing: DetailsSharingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllRequestTypes();
  }

  // initializes the form
  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      docTypeControl: new FormControl('', [Validators.required]),
      requestTypeControl: new FormControl('', [Validators.required]),
    });
  }

  // gets all the request types using service call
  getAllRequestTypes() {
    this.docService.getAllRequestTypes(this.uploadDocData.isDenial).subscribe((response) => {
      this.docTypes = response.data;
    });
  }

  // gets the document requests by request type using service call
  getDocumentRequestsByRequestType(requestTypeId: number) {
    this.docService
      .getDocumentRequestsByRequestType(
        requestTypeId,
        this.uploadDocData.investigationId
      )
      .subscribe((response) => {
        if (response.data) {
          this.requests = response.data;
        }
      });
  }

  // on selection of the reuest types
  onSelectionChange() {
    this.isSubmitClicked = false;
  }

  // gets the document request based on the request type selected
  onDocTypeSelected(docType: RequestTypeDropdownModel) {
    this.isDocTypeSelected = true;
    this.getDocumentRequestsByRequestType(docType.requestTypeId);
  }

  // clears the form
  onClear() {
    this.isDocTypeSelected = false;
    this.isSubmitClicked = false;
    this.uploadForm.reset();
  }

  // method to attch the document
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.uploadForm.valid) {
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to attach this document ?',
          false,
          'attachMisc'
        )
        .dialog.subscribe(() => {
          if (this.detailsSharing.alertDialogData.submit) {
            this.uploadDocument();
          }
        });
    } else {
      this.detailsSharing.openSnackBar(
        `Please Fill All Required Fields.`,
        'Dismiss',
        true
      );
    }
  }
  // attaching the document using service call
  uploadDocument() {
    const postData: AttachMiscllaneousDocumentToRequestModel = {
      documentId: this.uploadDocData.documentId,
      requestId:
        +this.uploadForm.controls.requestTypeControl.value.requestId,
      updatedUser: 'Dileep',
    };
    this.docService.attachMiscDocToRequest(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          `Document Attached Successfully.`,
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.uploadDocData.invNumber
        );
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          `Document cannot be attached.`,
          'Dismiss',
          true
        );
      }
    });
  }
}
