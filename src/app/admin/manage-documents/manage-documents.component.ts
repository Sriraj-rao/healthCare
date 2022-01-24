import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { CompaniesDropdownModel, RequestTypeDropdownModel } from 'src/app/investigations/models/doc-rquest-dropdowns.model';
import { DocumentPropertyModel } from 'src/app/investigations/models/document-property-values.model';
import { DocumentService } from 'src/app/investigations/services/document.service';
import { DocUpdateFormComponent } from '../modals/doc-update-form/doc-update-form.component';
import { AdminFormFieldModel } from '../models/form-fields.model';

@Component({
  selector: 'cwb-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.scss']
})
export class ManageDocumentsComponent implements OnInit {
  docForm: FormGroup;
  @Input() companies: CompaniesDropdownModel[];
  @Input() docTypes: RequestTypeDropdownModel[];
  isSubmitClicked = false;
  isCompanyChanged = false;
  properties: DocumentPropertyModel[];
  isDocTypeChanged = false;
  isEditMode = false;
  displayedColumns: string[] = ['propertyName', 'propertyType', 'parentId', 'orderBy', 'length', 'apiPropertyName', 'isRequired', 'isVisibleOnUI'];
  dataSource: MatTableDataSource<DocumentPropertyModel>;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  constructor(private formBuilder: FormBuilder, private docService: DocumentService,
    private dialog: MatDialog, private detailsSharing: DetailsSharingService) {
    this.detailsSharing.reloadAdminScreen.subscribe(response => {
      if (response) {
        this.getPropertiesByRequest();
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.docForm = this.formBuilder.group({
      companyControl: new FormControl('', [Validators.required]),
      docControl: new FormControl('', [Validators.required]),
      tableControl: new FormArray([])
    });
  }

  getPropertiesByRequest() {
    const companyId = +this.docForm.controls.companyControl.value.companyId;
    const requestId = +this.docForm.controls.docControl.value.requestTypeId;
    this.docService.getPropertiesByRequest(companyId, requestId).subscribe((response) => {
      if (response) {
        this.properties = response.data.sort((a, b) => {
          return a.orderBy - b.orderBy;
        });
        for (let x of this.properties) {
          this.getTableControlFormArray().push(this.formBuilder.group({
            propertyNameControl: new FormControl(x.propertyName),
            propertyTypeControl: new FormControl(x.propertyType),
            parentControl: new FormControl(x.parentId),
            orderByControl: new FormControl(x.orderBy),
            lengthControl: new FormControl(x.length),
            isRequiredControl: new FormControl(x.isRequired),
          }));
        }
        this.dataSource = new MatTableDataSource(this.properties);
        console.log(this.docForm.value);
      }
    });
  }

  getTableControlFormArray() {
    return this.docForm.get('tableControl') as FormArray;
  }

  onCompanyChanged(company: CompaniesDropdownModel) {
    this.isCompanyChanged = true;
  }

  onDocTypeChanged(docType: RequestTypeDropdownModel) {
    this.isDocTypeChanged = true;
    this.getPropertiesByRequest();
  }

  onAddDocTemplate() {
    const dialogConfig = new MatDialogConfig();
    const formFields: AdminFormFieldModel[] = [
      { fieldName: 'Property Name', fieldType: 'TextBox', formArrayIndex: 0 },
      {
        fieldName: 'Property Type', fieldType: 'Dropdown', formArrayIndex: 1, dropdownValues: [
          'TextBox', 'TextArea', 'DateTime', 'CheckBox','Label'
        ]
      },
      { fieldName: 'API Property Name', fieldType: 'TextBox', formArrayIndex: 2 },
      { fieldName: 'Parent Id', fieldType: 'Number', formArrayIndex: 3 },
      { fieldName: 'Is it a required field ?', fieldType: 'Radio', formArrayIndex: 4 },
      { fieldName: 'Is it visible on UI ?', fieldType: 'Radio', formArrayIndex: 5 },
      { fieldName: 'Max Length', fieldType: 'Number', formArrayIndex: 6 },
      { fieldName: 'Order By', fieldType: 'Number', formArrayIndex: 7 }
    ];
    dialogConfig.id = 'cwb-update-form-popup';
    dialogConfig.data = {
      formType: 'templateFields',
      requestTypeId: this.docForm.controls.docControl.value.requestTypeId,
      companyId: this.docForm.controls.companyControl.value.companyId,
      fields: formFields,
      header: 'New Document Template Property'
    };
    this.dialog.open(DocUpdateFormComponent, dialogConfig);
  }

  onSubmit() {
    this.isSubmitClicked = true;
    this.isEditMode = false;
  }

  onEditTable() {
    this.isEditMode = true;
  }

  onClear() {
    this.isSubmitClicked = false;
    this.isCompanyChanged = false;
    this.isDocTypeChanged = false;
    this.isEditMode = false;
    this.docForm.reset();
    this.docForm.clearValidators();
    this.docForm.updateValueAndValidity();
  }

}
