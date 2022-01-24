import { NgModule } from '@angular/core';
import { InvestigationsComponent } from './investigations.component';
import { InvestigationsRoutingModule } from './investigations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatusPipe } from './pipes/status.pipe';
import { InvestigationTypePipe } from './pipes/investigation-type.pipe';
import { ProofOfLossPipe } from './pipes/proof-of-loss.pipe';
import { PendCodePipe } from './pipes/pend-code.pipe';
import { EditInvestigationsPopupComponent } from './modals/edit-investigations-popup/edit-investigations-popup.component';
import { InvestigationDetailsComponent } from './investigation-details/investigation-details.component';
import { ClaimsAttachedComponent } from './claims-attached/claims-attached.component';
import { AddClaimsPopupComponent } from './modals/add-claims-popup/add-claims-popup.component';
import { CloseInvestigationPopupComponent } from './modals/close-investigation-popup/close-investigation-popup.component';
import { ClaimsAttachedSubTableComponent } from './claims-attached/claims-attached-sub-table/claims-attached-sub-table.component';
import { AddNewDocumentRequestComponent } from './modals/add-new-document-request/add-new-document-request.component';
import { DocumentRequestsComponent } from './document-requests/document-requests.component';
import { UploadDocumentPopupComponent } from './modals/upload-document-popup/upload-document-popup.component';
import { MiscellaneousDocumentsComponent } from './miscellaneous-documents/miscellaneous-documents.component';
import { UploadMiscDocumentPopupComponent } from './modals/upload-misc-document-popup/upload-misc-document-popup.component';
import { AttachMiscDocumentPopupComponent } from './modals/attach-misc-document-popup/attach-misc-document-popup.component';
import { DownloadDocumentsComponent } from './modals/download-documents/download-documents.component';
import { EditPendCodeComponent } from './modals/edit-pend-code/edit-pend-code.component';
import { NotesModule } from './Notes/notes.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    InvestigationsComponent,
    StatusPipe,
    InvestigationTypePipe,
    ProofOfLossPipe,
    PendCodePipe,
    EditInvestigationsPopupComponent,
    ClaimsAttachedComponent,
    InvestigationDetailsComponent,
    AddClaimsPopupComponent,
    CloseInvestigationPopupComponent,
    ClaimsAttachedSubTableComponent,
    AddNewDocumentRequestComponent,
    DocumentRequestsComponent,
    UploadDocumentPopupComponent,
    MiscellaneousDocumentsComponent,
    UploadMiscDocumentPopupComponent,
    AttachMiscDocumentPopupComponent,
    DownloadDocumentsComponent,
    EditPendCodeComponent,
  ],
  imports: [InvestigationsRoutingModule, SharedModule, NotesModule],
  providers: [DatePipe],
  exports: [
    InvestigationsComponent,
    StatusPipe,
    InvestigationTypePipe,
    ProofOfLossPipe,
    PendCodePipe,
    InvestigationDetailsComponent,
    ClaimsAttachedComponent,
  ],
})
export class InvestigationsModule {}
