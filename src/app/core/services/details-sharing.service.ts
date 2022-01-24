import { Injectable } from '@angular/core';
import { InsuredSummary } from '../../shared/models/insured-summary.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AlertPopupComponent } from 'src/app/shared/Modals/alert-popup/alert-popup.component';
import { environment } from 'src/environments/environment';
import { DocFileIds } from 'src/app/investigations/models/doc-file-ids.model';
import { LoggedInDetails } from 'src/app/shared/models/logged-in-details.model';
import { InvBreadcrumbModel } from 'src/app/shared/models/inv-breadcrumb-route.model';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { PreviewDocumentPredifinedModel } from 'src/app/shared/models/preview-properties.model';
import { InvestigationModel } from 'src/app/investigations/models/investigation.model';
import { PermissionsCheckingModel } from 'src/app/shared/models/permissions-checking.model';

@Injectable({
  providedIn: 'root',
})
export class DetailsSharingService {
  policyEffectiveDate: string;
  currentAccountStatuses;
  currentPolicyNo: string;
  invName: string;
  policyNumber: string;
  invAddress: string;
  invClaimNumber: string;
  alertDialogData;
  isSearchActive = false;
  errorOccurred: boolean;
  permissions:string[]=[];
  permissionsCheck: PermissionsCheckingModel;
  previewPredfinedValues: PreviewDocumentPredifinedModel;
  closedStatuses: string[] = [
    'INVESTIGATION COMPLETE',
    'INVESTIGATION CLOSED INCOMPLETE',
  ];
  public isClaimsTabClicked = new BehaviorSubject(false);
  public isInvestigationTabClicked = new Subject<boolean>();
  public reloadSingleInvestigation: Subject<string> = new Subject();
  public reloadNotes: Subject<boolean> = new Subject();
  public addNewlyCreatedInvestigation: Subject<number> = new Subject();
  public reloadAdminScreen: Subject<boolean> = new Subject();
  public loggedInUserDetails: Subject<LoggedInDetails> = new Subject();
  public policyForRoute: Subject<string> = new Subject();
  public invForRoute: Subject<InvBreadcrumbModel> = new Subject();
  public isSidenavExpanded = new BehaviorSubject(false);
  public isInvestigationExpanded = new BehaviorSubject(false);
  public isLoading = new BehaviorSubject(false);
  public isSearchLoading = new BehaviorSubject(false);

  constructor(private snackbar: MatSnackBar, public dialog: MatDialog) {}

  openSnackBar(message: string, action: string, caseError: boolean) {
    this.snackbar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: caseError ? 'snackbar-error' : 'snackbar-success',
    });
  }

  downloadAll(docFileIds: DocFileIds[]) {
    for (const x of docFileIds) {
      if (x.isCheckboxClicked) {
        const url = environment.config.fileDownloadUrl + x.fileId;
        this.forceDownload(url, x.fileName);
      }
    }
  }

  downloadSingleFile(docFileId: DocFileIds) {
    const url = environment.config.fileDownloadUrl + docFileId.fileId;
    this.forceDownload(url, docFileId.fileName);
  }

  forceDownload(url, fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(this.response);
      const tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send();
  }

  openAlertBox(
    alertText: string,
    submit: boolean,
    popup: string,
    investigationDetail?: InvestigationModel,
    requestNumber?: string,
    requestId?: number,
    invId?: number,
    invNumb?: string,
    invType?: string,
    claimNo?: string,
    policyNo?: string
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      alertText,
      submit,
      popup,
      requestNumber,
      requestId,
      investigationId: invId,
      investigationNumber: invNumb,
      investigationType: invType,
      claimNo,
      policyNo,
      parentInvestigationDetail: investigationDetail,
    };
    const dialogRef = this.dialog.open(AlertPopupComponent, dialogConfig);
    this.alertDialogData = dialogConfig.data;
    return { data: dialogConfig.data, dialog: dialogRef.afterClosed() };
  }
}
