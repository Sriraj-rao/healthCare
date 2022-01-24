import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddNewDocumentRequestComponent } from 'src/app/investigations/modals/add-new-document-request/add-new-document-request.component';
import { InvestigationModel } from 'src/app/investigations/models/investigation.model';

@Component({
  selector: 'cwb-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public alertData: {
      alertText: string;
      submit: boolean;
      popup: string;
      requestNumber: string;
      investigationId: number;
      investigationNumber: number;
      investigationType: string;
      requestId?: number;
      claimNo: string;
      policyNo: string;
      parentInvestigationDetail: InvestigationModel;
    }
  ) {}

  ngOnInit(): void {}
  // opens the edit reminder popup to update the reminder request
  editRemainder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'add-new-request-dialog-popup';

    dialogConfig.data = {
      isEdit: true,
      investigationId: this.alertData.investigationId,
      investigationNumber: this.alertData.investigationNumber,
      investigationType: this.alertData.investigationType,
      requestNumber: this.alertData.requestNumber,
      requestId: this.alertData.requestId,
      claimNo: this.alertData.claimNo,
      policyNo: this.alertData.policyNo,
      isDenial: false,
      parentInvestigationDetail: this.alertData.parentInvestigationDetail,
    };
    const dialogRef = this.dialog.open(
      AddNewDocumentRequestComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      this.onClose();
    });
  }
  // closes the dialog
  onClose() {
    this.alertData.submit = false;
    this.dialogRef.close();
  }
  // method for yes or no confirmation
  onSubmit() {
    this.alertData.submit = true;
    this.dialogRef.close();
  }
}
