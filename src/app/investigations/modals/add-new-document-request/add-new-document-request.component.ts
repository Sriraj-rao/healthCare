import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {
  faFilePdf,
  IconDefinition,
  faCalendarAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DocumentService } from '../../services/document.service';
import {
  CompaniesDropdownModel,
  RequestTypeDropdownModel,
} from '../../models/doc-rquest-dropdowns.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { NewDocumentRequestModel } from '../../models/new-doc-request.model';
import { DocumentPropertyModel } from '../../models/document-property-values.model';
import { FileViewerComponent } from 'src/app/shared/file-viewer/file-viewer.component';
import { DocFileIds } from '../../models/doc-file-ids.model';
import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';
import { DocumentRequestDetailsModel } from '../../models/document-request-details.model';
import { NewDocRequestInjectedData } from '../../models/modals-injected-models/new-request-injected.model';
import { CHARACTER_PATTERN } from '../../helper-methods/helper-methods';
import { StateManagementService } from 'src/app/core/services/state-management.service';
import { ContactInfo } from 'src/app/shared/models/contact-info.model';
import { CoverageSummary } from 'src/app/policy-account/insured/models/coverage-summary.model';
import { InsuredService } from 'src/app/policy-account/insured/services/insured.service';
import { PreviewDocumentPredifinedModel } from 'src/app/shared/models/preview-properties.model';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { PolicyAccountDetails } from 'src/app/shared/models/policy-account-details.model';
import { PolicyAccountsService } from 'src/app/policy-account/services/policy-account.service';
import { DatePipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'cwb-add-new-document-request',
  templateUrl: './add-new-document-request.component.html',
  styleUrls: ['./add-new-document-request.component.scss'],
})
export class AddNewDocumentRequestComponent implements OnInit {
  faFilePdf: IconDefinition = faFilePdf;
  faDownload = faDownload;
  faCalendarAlt = faCalendarAlt;

  isCompanySelected = false;
  isDocTypeSelected = false;
  companies: CompaniesDropdownModel[];
  docTypes: RequestTypeDropdownModel[];
  properties: DocumentPropertyModel[];
  uploadDocForm: FormGroup;
  checkboxIsClicked = false;
  isSubmitClicked = false;
  reminderNumber;
  postData: NewDocumentRequestModel;
  docFiles: DocFileIds[] = [];
  isPreviewDocument: boolean;
  templateFileId: string = null;
  isPreviewClickedOnce: boolean;
  confirmText: string;
  submitText: string;
  notSubmitText: string;
  editResponse: DocumentRequestDetailsModel;
  propertyInputDtos: any[] = [];
  alreadyExistingTemplateId: string;
  templateFileIdToStore: string;
  isPreviewTableDocument: boolean;
  companySelected: CompaniesDropdownModel;
  tableFileId: any;
  docType: RequestTypeDropdownModel;
  propertiesNamesWithFields: DocumentPropertyModel[];
  propertiesNotDisplayed: DocumentPropertyModel[];

  constructor(
    public dialogRef: MatDialogRef<AddNewDocumentRequestComponent>,
    public fileDialogRef: MatDialogRef<FileViewerComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public newDocRequestData: NewDocRequestInjectedData,
    private docService: DocumentService,
    private formBuilder: FormBuilder,
    private detailsSharing: DetailsSharingService,
    private stateMgmt: StateManagementService,
    private insuredService: InsuredService,
    private claimsService: ClaimsService,
    private policyService: PolicyAccountsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkInsuredExists();
    this.isPreviewClickedOnce = false;
    if (this.newDocRequestData.isEdit) {
      this.initializeComponentForEdit();
    } else {
      this.getAllCompanies();
      this.getAllRequestTypes();
    }
  }
  // initializes the form control fields
  initializeForm() {
    if (this.newDocRequestData.isEdit) {
      this.uploadDocForm = this.formBuilder.group({
        propertiesControl: new FormArray([]),
        commentsControl: new FormControl('', [
          Validators.required,
          Validators.pattern(CHARACTER_PATTERN),
        ]),
      });
    } else {
      this.uploadDocForm = this.formBuilder.group({
        docTypeControl: new FormControl('', [
          Validators.required,
          Validators.pattern(CHARACTER_PATTERN),
        ]),
        propertiesControl: new FormArray([]),
        commentsControl: new FormControl('', [
          Validators.required,
          Validators.pattern(CHARACTER_PATTERN),
        ]),
      });
    }
  }

  checkInsuredExists() {
    const parentInvestigationDetail =
      this.newDocRequestData.parentInvestigationDetail;
    let policyDetails = this.stateMgmt.getPolicyDetails();
    let insuredDetails = this.stateMgmt.getInsuredDetails();
    let claimDetails = this.stateMgmt.getClaimDetails();
    var mainClaimNum;
    if (parentInvestigationDetail.claimNum.length > 1) {
      mainClaimNum = parentInvestigationDetail.claimNum;
    } else {
      mainClaimNum = parentInvestigationDetail.number
        .trim()
        .substring(3, parentInvestigationDetail.number.trim().length - 2);
    }
    if (policyDetails && insuredDetails && claimDetails) {
      let index = claimDetails.claimsDatasource.findIndex(
        (x) => x.claimNum === mainClaimNum
      );
      if (
        policyDetails?.currentPolicyNo.toUpperCase().trim() ===
          parentInvestigationDetail.policyNo.toUpperCase().trim() &&
        insuredDetails?.currentPolicyNo.toUpperCase().trim() ===
          parentInvestigationDetail.policyNo.toUpperCase().trim() &&
        index > -1
      ) {
        var coverageSummaries = insuredDetails.coverageSummaries;
        this.setDefaultPreviewValues(
          policyDetails.ppoInformation,
          claimDetails.claimsDatasource,
          coverageSummaries,
          mainClaimNum
        );
      } else {
        this.getCoverageSummaries(
          parentInvestigationDetail.policyNo,
          mainClaimNum
        );
      }
    } else {
      this.getCoverageSummaries(
        parentInvestigationDetail.policyNo,
        mainClaimNum
      );
    }
  }

  getCoverageSummaries(policyNo: string, mainClaimNum: string) {
    this.insuredService
      .getInsuredCoverageSummaries(policyNo)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.getSingleClaimDetails(response.data, mainClaimNum);
        }
      });
  }

  getSingleClaimDetails(
    coverageSummaries: CoverageSummary[],
    claimNumber: string
  ) {
    this.claimsService
      .getClaimsByClaimNumber(claimNumber)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.getPpoInformation(response.data, coverageSummaries, claimNumber);
        }
      });
  }

  // gets the ppo information
  getPpoInformation(
    claimDetails: Claim[],
    coverageSummaries: CoverageSummary[],
    mainClaimNum: string
  ) {
    this.policyService
      .getAccountPPOInformation(
        this.newDocRequestData.parentInvestigationDetail.policyNo
      )
      .subscribe((response) => {
        if (response.isSuccess === true) {
          this.setDefaultPreviewValues(
            response.data,
            claimDetails,
            coverageSummaries,
            mainClaimNum
          );
        }
      });
  }

  getClaimThruDate(claimsDatasource: Claim[], claimNum: string): Date {
    let thruDate: Date = null;
    const curClaim = claimsDatasource.find((x) => x.claimNum === claimNum);

    if (curClaim !== null) {
      if (
        new Date(curClaim.claimThruDate.toString()).getTime() >
        new Date(curClaim.claimDate).getTime()
      ) {
        thruDate = curClaim.claimThruDate;
      }
    }

    return thruDate;
  }

  setDefaultPreviewValues(
    ppoInformation,
    claimDetails: Claim[],
    coverageSummaries: CoverageSummary[],
    mainClaimNum: string
  ) {
    const parentInvestigationDetail =
      this.newDocRequestData.parentInvestigationDetail;
    var dob;
    const curClaim: Claim = claimDetails.find(
      (x) => x.claimNum === mainClaimNum
    );
    const claimantName =
      parentInvestigationDetail.claimant.length > 0
        ? parentInvestigationDetail.claimant
        : curClaim.name;
    // var claimantName = parentInvestigationDetail.claimant;
    const findex = claimantName.trim().indexOf(' ');
    const lindex = claimantName.trim().lastIndexOf(' ');
    const claimantFirstName = claimantName.trim().substring(0, findex);
    const claimantLastName = claimantName
      .trim()
      .substring(lindex + 1, claimantName.trim().length);
    for (var x of coverageSummaries) {
      var coverage = x.insuredCoverages.find(
        (y) =>
          y.firstName.toUpperCase().trim() ===
            claimantFirstName.toUpperCase().trim() &&
          y.lastName.toUpperCase().trim() ===
            claimantLastName.toUpperCase().trim()
      );
      if (coverage) {
        dob = coverage.dob.toString();
        break;
      }
    }
    let claimThruDate = this.getClaimThruDate(claimDetails, mainClaimNum);
    let ppo = '';
    if (ppoInformation.length > 0) {
      ppo = ppoInformation[0].ppoName;
    }
    var previewPredfinedValues: PreviewDocumentPredifinedModel = {
      ClaimNumber: mainClaimNum,
      ClaimantFirstName: claimantFirstName,
      ClaimantLastName: claimantLastName,
      // .trim().substring(lindex + 1, claimantName.trim().length)
      ClaimantName: claimantName,
      ClaimantMiddleName: claimantName.trim().substring(findex, lindex).trim(),
      CompanyCode: parentInvestigationDetail.contact.companyCode,
      CurrentDate: this.datePipe.transform(new Date(), 'MM/dd/yyyy').toString(),
      DateOfBirth: this.datePipe
        .transform(new Date(dob), 'MM/dd/yyyy')
        .toString(),
      FileName: `${parentInvestigationDetail.contact.firstName}_${mainClaimNum}.pdf`,
      DateOfService: this.datePipe
        .transform(new Date(curClaim.claimDate), 'MM/dd/yyyy')
        .toString(),
      DateOfServiceFrom: this.datePipe
        .transform(new Date(curClaim.claimDate), 'MM/dd/yyyy')
        .toString(),
      DateOfServiceTo:
        claimThruDate != null
          ? this.datePipe
              .transform(new Date(claimThruDate), 'MM/dd/yyyy')
              .toString()
          : this.datePipe
              .transform(new Date(curClaim.claimDate), 'MM/dd/yyyy')
              .toString(),
      PatientName: claimantName,
      InsuredName: parentInvestigationDetail.contact.insuredName,
      InsuredAddress: this.policyHolderAddress(
        parentInvestigationDetail.contact
      ),
      PolicyNumber: parentInvestigationDetail.policyNo,
      PpoNetwork: ppo,
      PolicyCertificate: parentInvestigationDetail.policyNo,
      ClaimentDateOfBirth: this.datePipe
        .transform(new Date(dob), 'MM/dd/yyyy')
        .toString(),
      PatientDateOfBirth: this.datePipe
        .transform(new Date(dob), 'MM/dd/yyyy')
        .toString(),
      ClaimsFromYear: this.datePipe
        .transform(new Date(), 'MM/dd/yyyy')
        .toString(),
      PatientFirstName: claimantFirstName,
      PatientLastName: claimantLastName,
      PatientMiddleName: claimantName.trim().substring(findex, lindex).trim(),
      EntityName : ''
    }
    this.detailsSharing.previewPredfinedValues = previewPredfinedValues;
    console.log(new Date().toString());
    console.log(this.detailsSharing.previewPredfinedValues);
  }

  policyHolderAddress(policyHolder: ContactInfo): string {
    if (!!!policyHolder) {
      return 'NO ADDRESS PROVIDED';
    }
    let street = policyHolder.address || '';
    let city = policyHolder.city || '';
    const state = policyHolder.state || '';
    const zipCode = policyHolder.zip || '';
    street = street === '' ? street : `${street}`;
    city = city === '' ? city : `${city},`;
    const addr = `${street} ${city} ${state} ${zipCode}`.trim();
    return addr;
  }
  // initializes the components that has to be edited
  initializeComponentForEdit() {
    this.reminderNumber = +this.newDocRequestData.requestNumber
      .substring(7)
      .trim();
    this.isCompanySelected = true;
    this.isDocTypeSelected = true;
    this.getDocDetailsForEdit();
  }

  // sets the folowing boolean to its respective values when the document is selected and calls the getPropertiesByRequest method based on the condition
  onDocTypeSelected() {
    this.isDocTypeSelected = true;
    this.isPreviewDocument = false;
    this.isSubmitClicked = false;
    if (!this.newDocRequestData.isEdit) {
      this.getPropertiesByRequest();
    }
  }
  // toggles all the checkboxes based on the click of checkbox
  onAllCheckbocClicked(event: boolean) {
    if (event === true) {
      this.checkboxIsClicked = true;
    } else {
      this.checkboxIsClicked = false;
    }
  }
  // toggles the single checkbox based on the selection of checkbox
  onCheckboxClicked(event: boolean) {
    if (event === true) {
      this.checkboxIsClicked = true;
    } else {
      this.checkboxIsClicked = false;
    }
  }
  // gets all the document details that has to be edited by a service call by passing request id as a parameter
  getDocDetailsForEdit() {
    this.docService
      .getDocumentRequestDetails(this.newDocRequestData.requestId)
      .subscribe((response) => {
        if (response.data) {
          this.editResponse = response.data;
          this.getAllCompanies();
          this.getAllRequestTypes();
          this.properties = this.editResponse.propertyValues.sort((a, b) => {
            return a.orderBy - b.orderBy;
          });
          this.docFiles = this.editResponse.documentFiles;
          this.assignProperties();
        }
      });
  }
  // gets all company values using a service call
  getAllCompanies() {
    this.docService.getAllCompanies().subscribe((response) => {
      if (response.data) {
        this.companies = response.data;
        const compLetters = this.newDocRequestData.policyNo.trim().substr(0, 2);
        for (const x of this.companies) {
          if (
            ((compLetters === '52' || compLetters === '70') &&
              x.name.trim() === 'FLICA') ||
            ((compLetters === '02' || compLetters === '72') &&
              x.name.trim() === 'NFL') ||
            (compLetters === '55' && x.name.trim() === 'ELIC')
          ) {
            this.companySelected = x;
            break;
          }
        }
        if (this.newDocRequestData.isEdit) {
          const companyValue = this.companies?.find(
            (x) => x.name === this.editResponse.company
          );
          this.companySelected = companyValue;
        }
      }
    });
  }
  // gets all request types by using service call
  getAllRequestTypes() {
    this.docService
      .getAllRequestTypes(this.newDocRequestData.isDenial)
      .subscribe((response) => {
        this.docTypes = response.data;
        if (this.newDocRequestData.isEdit) {
          const docTypeValue = this.docTypes?.find(
            (x) => x.type === this.editResponse.requestType
          );
          this.docType = docTypeValue;
        }
      });
  }
  // gets the properties by request using service call by passing company id and request id as a parameters
  getPropertiesByRequest() {
    const companyId = +this.companySelected.companyId;
    const requestId =
      +this.uploadDocForm.controls.docTypeControl.value.requestTypeId;
    this.docService
      .getPropertiesByRequest(companyId, requestId)
      .subscribe((response) => {
        if (response) {
          this.properties = response.data.sort((a, b) => {
            return a.orderBy - b.orderBy;
          });
          console.log(this.properties);
          this.propertyInputDtos = [];
          this.assignProperties();
        }
      });
  }
  // gets the form array
  propertiesFormArray() {
    return this.uploadDocForm.get('propertiesControl') as FormArray;
  }
  // assigns the properties in a form array
  nestedPropertiesFormArray(i: number) {
    return this.propertiesFormArray().controls[i] as FormArray;
  }
  // assigns the properties in a form array
  assignProperties() {
    while (this.propertiesFormArray().length !== 0) {
      this.propertiesFormArray().removeAt(0);
    }
    let i = 0;
    this.propertiesNamesWithFields = [];
    this.propertiesNotDisplayed = [];
    for (const x of this.properties) {
      if (x.isVisibleOnUI) {
        if (x.parentId) {
          const index = this.propertiesNamesWithFields.findIndex(
            (y) => y.propertyId === x.parentId
          );
          if (index > -1) {
            const obj = this.propertiesNamesWithFields[index];
            this.propertiesNamesWithFields[index] = {
              ...obj,
              child: [...obj.child, x],
              propertyNameAsArray: this.getPropertyNameAsArray(
                obj.propertyName
              ),
            };
          }
        } else {
          this.propertiesNamesWithFields.push({ ...x, child: [] });
        }
        i = i + 1;
      } else {
        this.propertiesNotDisplayed.push(x);
      }
    }
    let j = 0;
    console.log(this.propertiesNamesWithFields);
    for (const y of this.propertiesNamesWithFields) {
      if (y.child.length > 0) {
        this.propertiesFormArray().push(new FormArray([]));
        this.asssignValidators(y, this.nestedPropertiesFormArray(j));
        for (const z of y.child) {
          this.asssignValidators(z, this.nestedPropertiesFormArray(j));
        }
      } else {
        this.asssignValidators(y, this.propertiesFormArray());
      }
      j = j + 1;
    }
    console.log(this.propertiesFormArray());
  }
  // assigns the validators for the dynamic fields
  asssignValidators(property: DocumentPropertyModel, formArray: FormArray) {
    var defaultValue;
    const propertyType = property.propertyType.trim().toUpperCase();
    if (propertyType === 'CHECKBOX') {
      defaultValue = false;
    } else {
      defaultValue = '';
    }
    if (property.propertyValue) {
      if (propertyType === 'CHECKBOX') {
        if (property.propertyValue.trim().toUpperCase() === 'TRUE') {
          defaultValue = true;
        } else {
          defaultValue = false;
        }
      } else {
        defaultValue = property.propertyValue;
      }
    }
    if (
      (propertyType === 'TEXTAREA' || propertyType === 'TEXTBOX') &&
      !property.parentId
    ) {
      if (property.isRequired) {
        formArray.push(
          new FormControl(defaultValue, [
            Validators.required,
            Validators.pattern(CHARACTER_PATTERN),
          ])
        );
      } else {
        formArray.push(
          new FormControl(defaultValue, [Validators.pattern(CHARACTER_PATTERN)])
        );
      }
    } else if (propertyType === 'CHECKBOX') {
      if (property.isRequired) {
        formArray.push(new FormControl(defaultValue, [Validators.required]));
      } else {
        formArray.push(new FormControl(defaultValue));
      }
    } else {
      if (property.isRequired) {
        formArray.push(new FormControl(defaultValue, [Validators.required]));
      } else {
        formArray.push(new FormControl(defaultValue));
      }
    }
  }
  // gets the property name as an array
  getPropertyNameAsArray(propertyName: string) {
    let nameAsArray = [];
    let start = 0;
    for (let i = 0; i < propertyName.length; i++) {
      if (propertyName[i] === '<' && propertyName[i + 1] === '%') {
        nameAsArray.push({
          value: propertyName.substring(start, i),
          controlIndex: 0,
        });
        start = i;
      }
      if (propertyName[i] === '>' && propertyName[i - 1] === '%') {
        nameAsArray.push({
          value: propertyName.substring(start, i + 1),
          controlIndex: 0,
        });
        start = i + 1;
      }
    }
    if (start < propertyName.length) {
      nameAsArray.push({
        value: propertyName.substring(start, propertyName.length),
        controlIndex: 0,
      });
    }
    let controlIndex = 1;
    nameAsArray = nameAsArray.map((k) => {
      if (k.value.includes('<%') && k.value.includes('%>')) {
        k.controlIndex = controlIndex;
        k.childIndex = controlIndex - 1;
        controlIndex = controlIndex + 1;
      }
      return k;
    });
    return nameAsArray;
  }
  // clears the form fields
  onClear() {
    if (!this.newDocRequestData.isEdit) {
      this.isSubmitClicked = false;
      this.isCompanySelected = false;
      this.isDocTypeSelected = false;
    }
    this.uploadDocForm.reset();
  }
  // downloads the selected file
  onDownloadFiles() {
    this.detailsSharing.downloadAll(this.docFiles);
  }

  checkFormValidForPreview() {
    let formValid;
    if (this.uploadDocForm.controls.docTypeControl) {
      formValid =
        this.uploadDocForm.controls.docTypeControl.valid &&
        this.uploadDocForm.controls.propertiesControl.valid;
    } else {
      formValid = this.uploadDocForm.controls.propertiesControl.valid;
    }
    return formValid;
  }
  // views the document
  onDocView() {
    console.log(this.templateFileIdToStore);
    if (this.checkFormValidForPreview()) {
      var count = 0;
      for (var i in this.propertyInputDtos) {
        if (
          this.propertiesFormArray().controls[i].value ===
          this.propertyInputDtos[i].propertyValue
        ) {
          count = count + 1;
        }
      }
      if (count != this.propertyInputDtos.length || count === 0) {
        this.propertyInputDtos = [];
        this.propertiesNamesWithFields.forEach((x, i) => {
          this.propertyInputDtos.push({
            propertyId: x.propertyId,
            propertyValue: this.propertiesFormArray().controls[i].value,
          });
        });
        this.alreadyExistingTemplateId = null;
      } else {
        this.alreadyExistingTemplateId = this.templateFileIdToStore;
      }
      this.isPreviewClickedOnce = true;
      this.createPostData();
      this.tableFileId = null;
      if (this.isPreviewDocument) {
      } else {
        this.isPreviewTableDocument = false;
        this.isPreviewDocument = true;
      }
    }
  }
  // previews the table  document
  onPreviewTableDocument(fileId) {
    if (fileId) {
      this.tableFileId = fileId;
      if (this.isPreviewDocument) {
      } else {
        this.isPreviewDocument = true;
      }
    }
  }
  // closes the preview document
  onPreviewClose() {
    this.isPreviewDocument = false;
  }
  // selects the file to upload
  onFileEmitted($event: FileToUpload) {
    this.docFiles.push($event);
  }
  // delets the uploaded file
  onFileDeleted($event) {
    this.docFiles.splice($event, 1);
  }
  // method for preview document based on the service call
  previewDocument() {
    this.docService.previewDocument(this.postData).subscribe((response) => {
      if (response.data) {
        this.templateFileId = response.data;
        this.createPostData();
        this.createNewDocumentRequest();
      }
    });
  }
  // stores the required file value when the file is selected
  onTemplateIdEmitted($event: string) {
    console.log(this.propertiesFormArray().controls);
    console.log(this.propertiesNamesWithFields);
    if (this.newDocRequestData.isEdit) {
      let count = 0;
      let i = 0;
      let length = 0;
      for (const x of this.propertiesNamesWithFields) {
        let actualValue;
        if (x.propertyType.trim().toUpperCase() === 'CHECKBOX') {
          if (x.propertyValue.trim().toUpperCase() === 'TRUE') {
            actualValue = true;
          } else {
            actualValue = false;
          }
        } else {
          actualValue = x.propertyValue;
        }
        if (x.child.length > 0) {
          var propValue = this.nestedPropertiesFormArray(i);
          if (propValue.controls[0].value === actualValue) {
            count = count + 1;
          }
          let j = 1;
          for (const y of x.child) {
            if (y.propertyType.trim().toUpperCase() === 'CHECKBOX') {
              if (y.propertyValue.trim().toUpperCase() === 'TRUE') {
                actualValue = true;
              } else {
                actualValue = false;
              }
            } else {
              actualValue = y.propertyValue;
            }
            if (propValue.controls[j].value === actualValue) {
              count = count + 1;
            }
            j = j + 1;
            length = length + 1;
          }
        } else {
          if (this.propertiesFormArray().controls[i].value === actualValue) {
            count = count + 1;
          }
        }
        i = i + 1;
        length = length + 1;
      }
      if (count != length) {
        this.templateFileId = $event;
        this.templateFileIdToStore = $event;
      } else {
        this.templateFileIdToStore = $event;
      }
    } else {
      this.templateFileId = $event;
      this.templateFileIdToStore = $event;
    }
  }

  onControlsChanged() {
    this.isSubmitClicked = false;
    if (this.isPreviewClickedOnce) {
      this.isPreviewClickedOnce = false;
    }
  }
  // submits the foem and uploaded documents
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.uploadDocForm.valid) {
      this.confirmSubmit(this.isPreviewDocument);
    } else {
      this.detailsSharing.openSnackBar(
        `Please Fill All Required Fields.`,
        'Dismiss',
        true
      );
    }
  }

  onParentCheckboxChanged(
    $event: MatCheckboxChange,
    i: number,
    property: DocumentPropertyModel
  ) {
    this.isSubmitClicked = false;
    if ($event.checked) {
      for (var x of this.nestedPropertiesFormArray(i).controls) {
        x.setValidators([Validators.required]);
        x.updateValueAndValidity();
      }
    } else {
      for (var x of this.nestedPropertiesFormArray(i).controls) {
        x.clearValidators();
        x.updateValueAndValidity();
        x.setValue('');
      }
    }
  }

  getEntityName(){
    console.log(this.propertiesFormArray().controls)
    console.log(this.propertiesFormArray().value)
    const docValue=this.uploadDocForm.get('docTypeControl').value.type.trim().toUpperCase();
    const previewValues=this.detailsSharing.previewPredfinedValues;
    if((docValue==='INSURED STATUS LETTER')||(docValue==='MEDICAL RECORDS')||(docValue==='CLAIM FORM')){
      return previewValues.InsuredName;
    }
    if((docValue==='AUTHORIZATION REQUEST')||(docValue==='SPECIAL REQUEST')){
      return this.propertiesFormArray().controls[0].value.trim();
    }
  }
  // creates the post data that has to be sent to an api
  createPostData() {
    const propertyInputDtos = [];
    let i = 0;
    for (const x of this.propertiesNamesWithFields) {
      if (x.child.length > 0) {
        propertyInputDtos.push({
          propertyId: x.propertyId,
          propertyValue:
            x.propertyType === 'CheckBox'
              ? this.nestedPropertiesFormArray(i).controls[0].value === ''
                ? 'false'
                : this.nestedPropertiesFormArray(i).controls[0].value.toString()
              : this.nestedPropertiesFormArray(i).controls[0].value.toString(),
          apiPropertyName: x.apiPropertyName,
          propertyType: x.propertyType,
        });
        let j = 1;
        for (const y of x.child) {
          propertyInputDtos.push({
            propertyId: y.propertyId,
            propertyValue:
              y.propertyType === 'CheckBox'
                ? this.nestedPropertiesFormArray(i).controls[j].value === ''
                  ? 'false'
                  : this.nestedPropertiesFormArray(i).controls[
                      j
                    ].value.toString()
                : this.nestedPropertiesFormArray(i).controls[
                    j
                  ].value.toString(),
            apiPropertyName: y.apiPropertyName,
            propertyType: y.propertyType,
          });
          j = j + 1;
        }
      } else {
        propertyInputDtos.push({
          propertyId: x.propertyId,
          propertyValue:
            x.propertyType === 'CheckBox'
              ? this.propertiesFormArray().controls[i].value === ''
                ? 'false'
                : this.propertiesFormArray().controls[i].value.toString()
              : this.propertiesFormArray().controls[i].value.toString(),
          apiPropertyName: x.apiPropertyName,
          propertyType: x.propertyType,
        });
      }
      i = i + 1;
    }
    this.detailsSharing.previewPredfinedValues={...this.detailsSharing.previewPredfinedValues,EntityName:this.getEntityName()}
    for (const z of this.propertiesNotDisplayed) {
      propertyInputDtos.push({
        propertyId: z.propertyId,
        propertyValue:
          this.detailsSharing.previewPredfinedValues[z.apiPropertyName],
        apiPropertyName: z.apiPropertyName,
        propertyType: z.propertyType,
      });
    }
    this.postData = {
      companyId: this.companySelected.companyId,
      investigationId: this.newDocRequestData.investigationId,
      requestTypeId: this.uploadDocForm.get('docTypeControl')
        ? this.uploadDocForm.get('docTypeControl').value.requestTypeId
        : this.docType.requestTypeId,
      requestNumber: this.newDocRequestData.isEdit
        ? this.reminderNumber + 1
        : 1,
      // createdByUser: 'Dileep',
      propertyInputDtos,
      templateFileId: this.templateFileId,
      files: this.docFiles,
      claimNo: this.newDocRequestData.claimNo,
      policyNo: this.newDocRequestData.policyNo,
      requestId: this.newDocRequestData.isEdit
        ? this.newDocRequestData.requestId
        : null,
      comment: this.uploadDocForm.get('commentsControl').value,
    };
  }
  // confirmation for resending the reminder request
  confirmSubmit(openPreview: boolean) {
    this.isPreviewDocument = false;
    this.createPostData();
    if (this.newDocRequestData.isEdit) {
      this.confirmText = 'Do you really want to resend document request ?';
      this.submitText = 'Reminder Sent Successfully.';
      this.notSubmitText = 'Reminder Cannot Be Sent.';
    } else {
      this.confirmText =
        'Are you sure you want to add new ' +
        this.uploadDocForm.get('docTypeControl').value.type +
        ' document request for ' +
        this.newDocRequestData.investigationNumber +
        ' ?';
      this.submitText =
        this.uploadDocForm.get('docTypeControl').value.type +
        ' Document Request for ' +
        this.newDocRequestData.investigationNumber +
        ' Created Successfully.';
      this.notSubmitText =
        this.uploadDocForm.get('docTypeControl').value.type +
        ' Document Request for ' +
        this.newDocRequestData.investigationNumber +
        ' Could Not Be Created.';
    }
    this.detailsSharing
      .openAlertBox(this.confirmText, false, 'newDocRequest')
      .dialog.subscribe((data) => {
        if (this.detailsSharing.alertDialogData.submit) {
          if (!this.isPreviewClickedOnce) {
            this.previewDocument();
          } else {
            this.createNewDocumentRequest();
          }
        } else {
          if (openPreview) {
            this.onDocView();
          }
        }
      });
  }
  // creates the post data for creating new document request and will be sent to an api
  createNewDocumentRequest() {
    this.docService
      .createNewDocumentRequest(this.postData)
      .subscribe((response) => {
        if (response) {
          this.detailsSharing.openSnackBar(this.submitText, 'Dismiss', false);
          this.detailsSharing.reloadSingleInvestigation.next(
            this.newDocRequestData.investigationNumber
          );
          this.dialogRef.close();
        } else {
          this.detailsSharing.openSnackBar(this.notSubmitText, 'Dismiss', true);
        }
      });
  }
}
