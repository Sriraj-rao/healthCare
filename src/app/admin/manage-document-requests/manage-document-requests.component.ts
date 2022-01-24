import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompaniesDropdownModel, RequestTypeDropdownModel } from 'src/app/investigations/models/doc-rquest-dropdowns.model';
import { DocUpdateFormComponent } from '../modals/doc-update-form/doc-update-form.component';
import { AdminFormFieldModel } from '../models/form-fields.model';

@Component({
  selector: 'cwb-manage-document-requests',
  templateUrl: './manage-document-requests.component.html',
  styleUrls: ['./manage-document-requests.component.scss']
})
export class ManageDocumentRequestsComponent implements OnInit {
  @Input() companies: CompaniesDropdownModel[];
  @Input() docTypes: RequestTypeDropdownModel[];
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddDocRequestType(){
    const dialogConfig = new MatDialogConfig();
    const formFields: AdminFormFieldModel[] = [
      {fieldName: 'Request Type', fieldType: 'TextBox', formArrayIndex: 0},
      {fieldName: 'Is Denial Request ?', fieldType: 'Radio', formArrayIndex: 1}
    ];
    dialogConfig.id = 'cwb-update-form-popup';
    dialogConfig.data = {
      formType: 'docRequestType',
      requestTypeId: 0,
      companyId: 0,
      fields: formFields,
      header: 'New Document Request Type'
    };
    this.dialog.open(DocUpdateFormComponent, dialogConfig);
  }

}
