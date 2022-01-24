import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AddDocTemplateModel } from '../../models/add-doc-template.model';
import { AddNewTemplatePropertyModel } from '../../models/add-new-template.model';
import { AdminFormFieldModel } from '../../models/form-fields.model';
import { DocUpdateFormInjected } from '../../models/Injected/doc-updated-form-injected.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'cwb-doc-update-form',
  templateUrl: './doc-update-form.component.html',
  styleUrls: ['./doc-update-form.component.scss']
})
export class DocUpdateFormComponent implements OnInit {
  formFields: AdminFormFieldModel[] = this.docUpdateData.fields;
  docForm: FormGroup;
  i: number;

  constructor(public dialogRef: MatDialogRef<DocUpdateFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public docUpdateData: DocUpdateFormInjected,
    private formBuilder: FormBuilder, private admService: AdminService, private detailsSharing: DetailsSharingService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.docForm = this.formBuilder.group({
      fieldsControl: new FormArray([])
    });
    for (let x of this.formFields) {
      this.getDocFormArray().push(
        new FormControl()
      );
    }
  }

  getDocFormArray() {
    return this.docForm.controls.fieldsControl as FormArray;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onClear() {
    this.docForm.reset();
  }

  onSubmit() {
    this.detailsSharing.openAlertBox('Are you sure you want to submit ?',
      false, 'reopenInv').dialog.subscribe(
        data => {
          if (this.detailsSharing.alertDialogData.submit) {
            if (this.docUpdateData.formType === 'templateFields') {
              const postData: AddNewTemplatePropertyModel = {
                companyId: this.docUpdateData.companyId,
                requestTypeId: this.docUpdateData.requestTypeId,
                apiPropertyName: this.getDocFormArray().controls[2].value,
                isRequired: this.getDocFormArray().controls[4].value ? this.getDocFormArray().controls[4].value === 1 ? true
                  : false : false,
                isVisibleOnUI: this.getDocFormArray().controls[5].value ? this.getDocFormArray().controls[5].value === 1 ? true
                  : false : false,
                length: this.getDocFormArray().controls[6].value,
                orderBy: this.getDocFormArray().controls[7].value,
                parentId: this.getDocFormArray().controls[3].value,
                propertyId: 0,
                propertyName: this.getDocFormArray().controls[0].value,
                propertyType: this.getDocFormArray().controls[1].value,
              };
              console.log(postData);
              this.addNewTemplateProperty(postData);
            }
            if (this.docUpdateData.formType === 'docTemplate') {
              const postData: AddDocTemplateModel = {
                requestTypeId: this.docUpdateData.requestTypeId,
                fileName: this.getDocFormArray().controls[0].value,
                requestNumber: this.getDocFormArray().controls[1].value,
                companyId: this.docUpdateData.companyId,
                boxApi: this.getDocFormArray().controls[2].value,
              };
              console.log(postData);
              this.addNewDocumentTemplate(postData);
            }
            if (this.docUpdateData.formType === 'docRequestType') {
              let requestType = this.getDocFormArray().controls[0].value;
              let isDenial = this.getDocFormArray().controls[1].value ? this.getDocFormArray().controls[1].value === 1 ? true
                : false : false
              this.addNewDocumentRequestType(requestType, isDenial);
            }
          }
        }
      );
  }

  onAdd() {
    var data = [
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PatientFirstName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Patient First Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PatientMiddleName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Patient Middle Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PatientLastName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Patient Last Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PolicyNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Policy Number", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DateOfServiceFrom", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Date of Service From", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DateOfServiceTo", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Date of Service To", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claim Number", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "CompanyCode", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Company Code", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "FileName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "File Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ProviderName", "isRequired": true, "isVisibleOnUI": true, "length": 100, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Provider Name", "propertyType": "TextBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "HistoryAndPhysicalExam", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 3, "parentId": null, "propertyId": 0, "propertyName": "History and Physical Exam", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClinicalNotes", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 4, "parentId": null, "propertyId": 0, "propertyName": "Clinical Notes", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "RadiologyReports", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 5, "parentId": null, "propertyId": 0, "propertyName": "Radiology Reports", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PhysicianOrders", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 6, "parentId": null, "propertyId": 0, "propertyName": "Physician Orders", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ErReports", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 7, "parentId": null, "propertyId": 0, "propertyName": "Emergency Room Reports", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AdmitDischargeSummary", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 8, "parentId": null, "propertyId": 0, "propertyName": "Admit/Discharge Summaries", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "CompleteChart", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 9, "parentId": null, "propertyId": 0, "propertyName": "Complete Chart", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "Pathology", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 10, "parentId": null, "propertyId": 0, "propertyName": "Pathology", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ProgressNotes", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 11, "parentId": null, "propertyId": 0, "propertyName": "Progress Notes", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PsychiatricEvaluation", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 12, "parentId": null, "propertyId": 0, "propertyName": "Psychiatric/Psychological Evaluation", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ConsultationReports", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 13, "parentId": null, "propertyId": 0, "propertyName": "Consultation Reports", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "LabTestReports", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 14, "parentId": null, "propertyId": 0, "propertyName": "Laboratory Reports/Tests", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "OperativeReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 15, "parentId": null, "propertyId": 0, "propertyName": "Operative Report", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "MammographyReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 16, "parentId": null, "propertyId": 0, "propertyName": "Mammography Report", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PharmacyMedication", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 17, "parentId": null, "propertyId": 0, "propertyName": "Pharmacy/Medication", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "Other", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 18, "parentId": null, "propertyId": 0, "propertyName": "Other (specify): <%TextBox%>", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "", "isRequired": false, "isVisibleOnUI": true, "length": 200, "orderBy": 19, "parentId": null, "propertyId": 0, "propertyName": "I understand that any information released pursuant to this request WILL NOT include any information related to my treatment for AIDS/HIV, behavioral health/psychiatric care treatment or treatment for drug and alcohol abuse specifically checked below:", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AidsHiv", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 20, "parentId": null, "propertyId": 0, "propertyName": "AIDS/HIV", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "BehavioralHealth", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 21, "parentId": null, "propertyId": 0, "propertyName": "Behavioral Health (Psychiatric)", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DrugAlcohol", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 22, "parentId": null, "propertyId": 0, "propertyName": "Drug & Alcohol", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AdditionalTimeframe", "isRequired": true, "isVisibleOnUI": true, "length": 50, "orderBy": 23, "parentId": null, "propertyId": 0, "propertyName": "Additional Timeframe", "propertyType": "TextBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantFirstName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant First Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantMiddleName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant Middle Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantLastName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant Last Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PolicyNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Policy Number", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DateOfService", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Date of Service", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claim Number", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "CompanyCode", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Company Code", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "FileName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "File Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ExclusionAndLimitationsInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Exclusion And Limitations Information", "propertyType": "TextArea" }
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AccidentAndBodilyInjuryInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Accident and Bodily Injury Information", "propertyType": "TextArea" }
    ];
    this.i = 0
  }

  onAddMed() {
    var data = [
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantFirstName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant First Name", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantMiddleName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant Middle Name", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimantLastName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claimant Last Name", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PolicyNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Policy Number", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DateOfService", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Date of Service", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimNumber", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claim Number", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "CompanyCode", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Company Code", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "FileName", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "File Name", "propertyType": "Label" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimsFromYear", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claims From Year", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ClaimentDateOfBirth", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "Claiment Date Of Birth", "propertyType": "DateTime" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PpoNetwork", "isRequired": true, "isVisibleOnUI": false, "length": 20, "orderBy": 1, "parentId": null, "propertyId": 0, "propertyName": "PPO Network", "propertyType": "Label" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "RequestMedicalRecords", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Complete medical records from <%TextBox%> through current", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ItemizedHospitalBill", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 3, "parentId": null, "propertyId": 0, "propertyName": "Itemized Hospital Bill", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "EmergencyRoomReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 4, "parentId": null, "propertyId": 0, "propertyName": "Emergency room report for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AdmitSummary", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 5, "parentId": null, "propertyId": 0, "propertyName": "Admit summary including History and Physical for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DischargeSummaries", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 6, "parentId": null, "propertyId": 0, "propertyName": "Discharge summary for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DrugAlcohol", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 7, "parentId": null, "propertyId": 0, "propertyName": "Consultation reports for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "OperativeReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 8, "parentId": null, "propertyId": 0, "propertyName": "Operative reports for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "PathologyReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 9, "parentId": null, "propertyId": 0, "propertyName": "Pathology, radiology, and cardiology reports for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "DrugScreenReport", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 10, "parentId": null, "propertyId": 0, "propertyName": "EtoH/drug screen results for the date(s) listed above", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "Other", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 11, "parentId": null, "propertyId": 0, "propertyName": "Other: <%TextBox%>", "propertyType": "CheckBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AuthorizationAttached", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 12, "parentId": null, "propertyId": 0, "propertyName": "Authorization for the Release of Information is enclosed", "propertyType": "CheckBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ExclusionAndLimitationsInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Exclusion And Limitations Information", "propertyType": "TextArea" }
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AccidentAndBodilyInjuryInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Accident and Bodily Injury Information", "propertyType": "TextArea" }
    ];
    this.i = 0
  }

  onAddMedChild() {
    var data = [
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "OtherInformation", "isRequired": false, "isVisibleOnUI": true, "length": 100, "orderBy": 11, "parentId": 663, "propertyId": 0, "propertyName": "Other Information", "propertyType": "TextBox" },
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "MedicalRecordsFromYear", "isRequired": false, "isVisibleOnUI": true, "length": 20, "orderBy": 2, "parentId": 654, "propertyId": 0, "propertyName": "Medical Records From Year", "propertyType": "TextBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ExclusionAndLimitationsInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Exclusion And Limitations Information", "propertyType": "TextArea" }
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AccidentAndBodilyInjuryInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Accident and Bodily Injury Information", "propertyType": "TextArea" }
    ];
    this.i = 0
  }

  onAddChild() {
    var data = [
      { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "OtherInformation", "isRequired": false, "isVisibleOnUI": true, "length": 100, "orderBy": 24, "parentId": 523, "propertyId": 0, "propertyName": "Other Information", "propertyType": "TextBox" },
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "ExclusionAndLimitationsInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Exclusion And Limitations Information", "propertyType": "TextArea" }
      // { "companyId": this.docUpdateData.companyId, "requestTypeId": this.docUpdateData.requestTypeId, "apiPropertyName": "AccidentAndBodilyInjuryInformation", "isRequired": true, "isVisibleOnUI": true, "length": 1500, "orderBy": 2, "parentId": null, "propertyId": 0, "propertyName": "Accident and Bodily Injury Information", "propertyType": "TextArea" }
    ];
    this.i = 0
  }


 

  addNewTemplateProperty(postData: AddNewTemplatePropertyModel) {
      this.admService.addNewTemplateProperty(postData).subscribe(response => {
        if (response) {
          this.detailsSharing.openSnackBar('Document Template Property added successfully', 'Dismiss', false);
          this.detailsSharing.reloadAdminScreen.next(true);
          this.dialogRef.close();
        }
      });
  }

  addNewDocumentTemplate(postData: AddDocTemplateModel) {
    this.admService.addNewDocumentTemplate(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar('Document Template added successfully', 'Dismiss', false);
        this.detailsSharing.reloadAdminScreen.next(true);
        this.dialogRef.close();
      }
    });
  }

  addNewDocumentRequestType(requestType: string, isDenial: boolean) {
    this.admService.addNewDocumentRequestType(requestType, isDenial).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar('Document Request Type added successfully', 'Dismiss', false);
        this.detailsSharing.reloadAdminScreen.next(true);
        this.dialogRef.close();
      }
    });
  }

}
