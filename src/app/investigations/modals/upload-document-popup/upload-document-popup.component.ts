import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  IconDefinition,
  faUpload,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { DeliveryMethodsModel } from '../../models/doc-rquest-dropdowns.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from '../../services/document.service';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DocumentPropertyModel } from '../../models/document-property-values.model';
import { UploadDocumentModel } from '../../models/upload-document.model';
import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';
import { CHARACTER_PATTERN } from '../../helper-methods/helper-methods';
import { MatCheckbox } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cwb-upload-document-popup',
  templateUrl: './upload-document-popup.component.html',
  styleUrls: ['./upload-document-popup.component.scss'],
})
export class UploadDocumentPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UploadDocumentPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public uploadDocData: {
      requestId: number;
      requestType: string;
      templateId: number;
      investigationId: number;
      claimNo: string;
      policyNo: string;
      invNumber: string;
    },
    private docService: DocumentService,
    private formBuilder: FormBuilder,
    public detailsSharing: DetailsSharingService,
    private datePipe: DatePipe
  ) {}
  // icons
  faUpload: IconDefinition = faUpload;
  faFileAlt = faFileAlt;
  faTrashAlt = faTrashAlt;
  faCalendarAlt = faCalendarAlt;

  deliveryMethods: DeliveryMethodsModel[] = [];
  uploadForm: FormGroup;
  properties: DocumentPropertyModel[];
  isSubmitClicked = false;
  isVerifyCheckBoxClicked = false;
  isUploading: boolean;
  fileuploaded = false;
  filesToSend: FileToUpload[] = [];
  maxDate = new Date();
  docType: string;
  @ViewChild('closeReq') closeReq: MatCheckbox;

  ngOnInit(): void {
    this.initializeForm();
    this.setCommentsValidators();
    this.initializeDocTypes();
    this.getDocumentTemplatePropertyValues();
    this.getAllDeliveriyMethods();
  }
  // initializes the form
  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      receivedDateControl: new FormControl('', [Validators.required]),
      deliveryMethodControl: new FormControl('', [Validators.required]),
      // propertiesControl: new FormArray([]),
      commentsControl: new FormControl('', [
        Validators.required,
        Validators.pattern(CHARACTER_PATTERN),
      ]),
    });
  }
  //setting validation for comments form control
  setCommentsValidators() {
    const commentsControl = this.uploadForm.get('commentsControl');
    if(this.detailsSharing.permissionsCheck.isAddNotes)
    {
      commentsControl.setValidators([Validators.required,Validators.pattern(CHARACTER_PATTERN)]);
    }
    else{
      commentsControl.setValidators(null);
    }
    commentsControl.updateValueAndValidity();
     
      
  }
  //initializes the doc types
  initializeDocTypes() {
    this.docType = this.uploadDocData.requestType;
  }
  // gets the document template property values using a service call
  getDocumentTemplatePropertyValues() {
    this.docService
      .getDocumentTemplatePropertyValues(this.uploadDocData.requestId)
      .subscribe((response) => {
        if (response) {
          this.properties = response.data;
          // for (const x of this.properties) {
          //   this.propertiesFormArray().push(
          //     new FormControl(x.propertyValue, [Validators.required])
          //   );
          // }
        }
      });
  }
  // gets all the delivery methods using  a service call
  getAllDeliveriyMethods() {
    this.docService.getAllDeliveriyMethods().subscribe((response) => {
      if (response) {
        for (const x of response.data) {
          if (!(x.name === 'Request')) {
            this.deliveryMethods.push(x);
          }
        }
      }
    });
  }
  // sets the properties of the form array
  propertiesFormArray() {
    this.uploadForm.get('propertiesControl').disable();
    return this.uploadForm.get('propertiesControl') as FormArray;
  }
  // changes the isSubmitted boolean to false on selecting the options of the deleivery methods and datepicker
  onSelectionChange() {
    this.isSubmitClicked = false;
  }
  // resets the form values
  onClear() {
    this.isSubmitClicked = false;
    this.isVerifyCheckBoxClicked = false;
    this.uploadForm.controls.receivedDateControl.reset();
    this.uploadForm.controls.deliveryMethodControl.reset();
  }
  // toggles the checkbox
  onCheckboxClicked() {
    this.isVerifyCheckBoxClicked = !this.isVerifyCheckBoxClicked;
  }

  // when the close request is checked following method will execute and asks confirmation for closing the request
  onCloseRequestClicked(event) {
    if (!this.closeReq.checked) {
      event.preventDefault();
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to close this request ?',
          false,
          'closeInv'
        )
        .dialog.subscribe(() => {
          if (this.detailsSharing.alertDialogData.submit) {
            setTimeout(() => (this.closeReq.checked = true));
          }
        });
    }
  }

  // submit method to upload the document and the form
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.uploadForm.valid) {
      if (this.filesToSend.length === 0) {
        this.fileuploaded = true;
        this.detailsSharing.openSnackBar(
          `Please select a file to upload.`,
          'Dismiss',
          true
        );
      } else {
        if (!this.closeReq.checked) {
          this.detailsSharing
            .openAlertBox(
              'Are you sure you have verified the document and want to submit without closing the request ?',
              false,
              'closeInv'
            )
            .dialog.subscribe(() => {
              if (this.detailsSharing.alertDialogData.submit) {
                this.uploadDocument();
              }
            });
        } else {
          this.fileuploaded = false;
          this.detailsSharing
            .openAlertBox(
              'Are you sure you have verified this document and want to upload it ?',
              false,
              'closeInv'
            )
            .dialog.subscribe(() => {
              if (this.detailsSharing.alertDialogData.submit) {
                this.uploadDocument();
              }
            });
        }
      }
    } else {
      if (this.filesToSend.length === 0) {
        this.fileuploaded = true;
      }
      this.detailsSharing.openSnackBar(
        `Please Fill All Required Fields.`,
        'Dismiss',
        true
      );
    }
  }
  // creates the object that has to be sent as a post data to api
  uploadDocument() {
    const postData: UploadDocumentModel = {
      deliveryId:
        +this.uploadForm.controls.deliveryMethodControl.value.deliveryId,
      isVerified: true,
      receivedDate: this.datePipe.transform(
        this.uploadForm.controls.receivedDateControl.value,
        'MM-dd-yyyy'
      ),
      requestId: this.uploadDocData.requestId,
      investigationId: this.uploadDocData.investigationId,
      templateId: this.uploadDocData.templateId,
      claimNo: this.uploadDocData.claimNo,
      policyNo: this.uploadDocData.policyNo,
      comment: this.uploadForm.controls.commentsControl.value,
      isRequestClosed: this.closeReq.checked,
      files: this.filesToSend,
    };
    this.docService.uploadDocument(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          `Document Uploaded Successfully.`,
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.uploadDocData.invNumber
        );
        this.isUploading = false;
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
    this.filesToSend.push($event);
    this.fileuploaded = false;
  }

  // deletes the file
  onFileDeleted($event) {
    this.filesToSend.splice($event, 1);
  }
}
