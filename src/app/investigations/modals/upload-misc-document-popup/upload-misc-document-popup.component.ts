import { Component, OnInit, Inject } from '@angular/core';
import { IconDefinition, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { DocumentService } from '../../services/document.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DeliveryMethodsModel } from '../../models/doc-rquest-dropdowns.model';
import { UploadMiscellaneousDocumentsModel } from '../../models/upload-miscellaneous-doc.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';
import { CHARACTER_PATTERN } from '../../helper-methods/helper-methods';
import { UploadMiscDocInjectedData } from '../../models/modals-injected-models/upload-misc-injected.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cwb-upload-misc-document-popup',
  templateUrl: './upload-misc-document-popup.component.html',
  styleUrls: ['./upload-misc-document-popup.component.scss'],
})
export class UploadMiscDocumentPopupComponent implements OnInit {
  // icons
  faUpload: IconDefinition = faUpload;
  faCalendarAlt = faCalendarAlt;

  deliveryMethods: DeliveryMethodsModel[] = [];
  uploadForm: FormGroup;

  // boolean
  isSubmitClicked = false;
  isVerifyCheckBoxClicked = false;

  maxDate = new Date();
  filesToSend: FileToUpload;

  constructor(
    public dialogRef: MatDialogRef<UploadMiscDocumentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public uploadDocData: UploadMiscDocInjectedData,
    private docService: DocumentService,
    private formBuilder: FormBuilder,
    private detailsSharing: DetailsSharingService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllDeliveriyMethods();
  }
  // initializes the form
  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      docTypeControl: new FormControl('', [
        Validators.required,
        Validators.pattern(CHARACTER_PATTERN),
      ]),
      receivedDateControl: new FormControl('', [Validators.required]),
      deliveryMethodControl: new FormControl('', [Validators.required]),
    });
  }
  // gets the delivery methods using service call
  getAllDeliveriyMethods() {
    this.docService.getAllDeliveriyMethods().subscribe((response) => {
      if (response) {
        this.deliveryMethods = response.data.filter(
          (x) => !(x.name === 'Request')
        );
      }
    });
  }
  // changes the isSubmitted boolean to false on selecting the options of the deleivery methods and datepicker
  onSelectionChange() {
    this.isSubmitClicked = false;
  }

  // resets the form values
  onClear() {
    this.isSubmitClicked = false;
    this.isVerifyCheckBoxClicked = false;
    this.uploadForm.reset();
  }

  // toggles the checkbox
  onCheckboxClicked() {
    this.isVerifyCheckBoxClicked = !this.isVerifyCheckBoxClicked;
  }

  // submit method to upload the document and the form
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.uploadForm.valid) {
      if (!this.filesToSend) {
        this.detailsSharing.openSnackBar(`Please select a file to upload.`, 'Dismiss', true);
      }
      else {
        this.detailsSharing
          .openAlertBox(
            'Are you sure you have verified this document and want to upload it ?',
            false,
            'uploadMisc'
          )
          .dialog.subscribe(() => {
            if (this.detailsSharing.alertDialogData.submit) {
              this.uploadDocument();
            }
          });
      }
    }
    else {
      this.detailsSharing.openSnackBar(
        `Please Fill All Required Fields.`,
        'Dismiss',
        true
      );
    }
  }

  // creates the object that has to be sent as a post data to api
  uploadDocument() {
    const postData: UploadMiscellaneousDocumentsModel = {
      // createdByUser: 'Dileep',
      deliveryId:
        +this.uploadForm.controls.deliveryMethodControl.value.deliveryId,
      isVerified: true,
      receivedDate: this.datePipe.transform( this.uploadForm.controls.receivedDateControl.value, 'MM-dd-yyyy'),
      investigationId: this.uploadDocData.investigationId,
      name: this.uploadForm.controls.docTypeControl.value,
      claimNo: this.uploadDocData.claimNo,
      policyNo: this.uploadDocData.policyNo,
      files: this.filesToSend,
    };
    this.docService
      .uploadMiscellaneousDocument(postData)
      .subscribe((response) => {
        if (response) {
          this.detailsSharing.openSnackBar(
            `Document Uploaded Successfully.`,
            'Dismiss',
            false
          );
          this.detailsSharing.reloadSingleInvestigation.next(
            this.uploadDocData.invNumber
          );
          this.dialogRef.close();
        } else {
          this.detailsSharing.openSnackBar(
            `Document cannot be uploaded.`,
            'Dismiss',
            true
          );
        }
      });
  }

  // uploads the file
  onFileEmitted($event) {
    this.filesToSend = $event;
  }

  // deletes the file
  onFileDeleted($event) {
    this.filesToSend = null;
  }
}
