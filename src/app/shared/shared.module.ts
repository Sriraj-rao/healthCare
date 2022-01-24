import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusTextPipe } from './pipes/status-text.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../core/http-interceptors/loader.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GainLossPipe } from './pipes/gain-loss.pipe';
import { AddInvestigationPopupComponent } from './Modals/add-investigation-popup/add-investigation-popup.component';
import { ViewClaimsDetailsPopupComponent } from './Modals/view-claims-details-popup/view-claims-details-popup.component';
import { ClaimDetailsPopupComponent } from './Modals/claim-details-popup/claim-details-popup.component';
import { ZipcodePipe } from './pipes/zip-code.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserNotSupportedComponent } from './Modals/browser-not-supported/browser-not-supported.component';
import { AlertPopupComponent } from './Modals/alert-popup/alert-popup.component';
import { FilterOptionsPipe } from './pipes/filter-options.pipe';
// import { AutofocusDirective } from './directives/auto-focus.directive';
import { DocumentUploaderComponent } from './document-uploader/document-uploader.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { ReopenPopupComponent } from '../investigations/modals/reopen-popup/reopen-popup.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FileListComponent } from './file-list/file-list.component';
import { MatRadioModule } from '@angular/material/radio';


const modules = [
  MaterialModule,
  CommonModule,
  FontAwesomeModule,
  FlexLayoutModule,
  RouterModule,
  FormsModule,
  NgbModule,
  ReactiveFormsModule,
  NgxDocViewerModule,
  MatRadioModule
];

@NgModule({
  declarations: [SearchComponent, NavbarComponent, StatusTextPipe, GainLossPipe,
    ZipcodePipe, AddInvestigationPopupComponent, ViewClaimsDetailsPopupComponent,
    ClaimDetailsPopupComponent, PageNotFoundComponent, BrowserNotSupportedComponent,
    AlertPopupComponent, FilterOptionsPipe, DocumentUploaderComponent, LoadingIconComponent,
    ReopenPopupComponent, FileViewerComponent, FileListComponent],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    SearchComponent,
    NavbarComponent,
    StatusTextPipe,
    GainLossPipe,
    AddInvestigationPopupComponent, ViewClaimsDetailsPopupComponent, ClaimDetailsPopupComponent,
    PageNotFoundComponent, BrowserNotSupportedComponent, AlertPopupComponent, ReopenPopupComponent,
    ZipcodePipe,
    FilterOptionsPipe,
    DocumentUploaderComponent,
    LoadingIconComponent,
    FileViewerComponent,
    FileListComponent
  ],
  entryComponents: [
    // AddInvestigationPopupComponent,
    // ViewClaimsDetailsPopupComponent
  ],
  providers: [
    // DetailsSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
})
export class SharedModule {
  // static forRoot(): ModuleWithProviders<SharedModule> {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ DetailsSharingService ]                       //<<<====here
  //   };
  // }
}
