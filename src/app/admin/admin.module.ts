import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';
import { ManageDocumentTemplatesComponent } from './manage-document-templates/manage-document-templates.component';
import { DocUpdateFormComponent } from './modals/doc-update-form/doc-update-form.component';
import { ManageDocumentRequestsComponent } from './manage-document-requests/manage-document-requests.component';



@NgModule({
  declarations: [AdminComponent, RoleManagementComponent, ManageDocumentsComponent,
    ManageDocumentTemplatesComponent, DocUpdateFormComponent, ManageDocumentRequestsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [
    AdminComponent,
    RoleManagementComponent,
    ManageDocumentsComponent,
    ManageDocumentTemplatesComponent,
    DocUpdateFormComponent,
    ManageDocumentRequestsComponent
  ]
})
export class AdminModule { }
