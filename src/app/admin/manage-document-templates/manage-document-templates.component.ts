import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { CompaniesDropdownModel, RequestTypeDropdownModel } from 'src/app/investigations/models/doc-rquest-dropdowns.model';
import { DocUpdateFormComponent } from '../modals/doc-update-form/doc-update-form.component';
import { AdminFormFieldModel } from '../models/form-fields.model';

@Component({
  selector: 'cwb-manage-document-templates',
  templateUrl: './manage-document-templates.component.html',
  styleUrls: ['./manage-document-templates.component.scss']
})
export class ManageDocumentTemplatesComponent implements OnInit {
  @Input() companies: CompaniesDropdownModel[];
  @Input() docTypes: RequestTypeDropdownModel[];
  docForm: FormGroup;
  isSubmitClicked = false;
  isDocTypeChanged: boolean = false;
  requestId: number;
  isCompanyChanged = false;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public detailsSharing: DetailsSharingService) {
    // this.detailsSharing.reloadAdminScreen.subscribe(response => {
    //   if (response) {
    //     this.getAllCompanies();
    //   }
    // });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.docForm = this.formBuilder.group({
      companyControl: new FormControl('', [Validators.required]),
      docControl: new FormControl('', [Validators.required]),
    });
  }

  onCompanyChanged(company: CompaniesDropdownModel) {
    this.isCompanyChanged = true;
  }

  onDocTypeChanged(docType: RequestTypeDropdownModel) {
    this.isDocTypeChanged = true;
  }

  onClear() {
    this.isSubmitClicked = false;
    this.isCompanyChanged = false;
    this.isDocTypeChanged = false;
    this.docForm.reset();
    this.docForm.clearValidators();
    this.docForm.updateValueAndValidity();
  }

  onAddDocTemplate(){
    const dialogConfig = new MatDialogConfig();
    const formFields: AdminFormFieldModel[] = [
      {fieldName: 'File Name', fieldType: 'TextBox', formArrayIndex: 0},
      {fieldName: 'Request Number', fieldType: 'Number', formArrayIndex: 1},
      {fieldName: 'Box Api', fieldType: 'TextBox', formArrayIndex: 2},
    ];
    dialogConfig.id = 'cwb-update-form-popup';
    dialogConfig.data = {
      formType: 'docTemplate',
      requestTypeId: this.docForm.controls.docControl.value.requestTypeId,
      companyId: this.docForm.controls.companyControl.value.companyId,
      fields: formFields,
      header: 'New Document Template'
    };
    this.dialog.open(DocUpdateFormComponent, dialogConfig);
  }
}