import { Component, OnInit, Input } from '@angular/core';
import {
  IconDefinition,
  faChevronRight,
  faChevronDown,
  faPlusCircle,
  faUpload,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { AddClaimsPopupComponent } from '../modals/add-claims-popup/add-claims-popup.component';
import { AddNewDocumentRequestComponent } from '../modals/add-new-document-request/add-new-document-request.component';
import { UploadMiscDocumentPopupComponent } from '../modals/upload-misc-document-popup/upload-misc-document-popup.component';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { InvestigationModel } from '../models/investigation.model';

@Component({
  selector: 'cwb-investigation-details',
  templateUrl: './investigation-details.component.html',
  styleUrls: ['./investigation-details.component.scss'],
})
export class InvestigationDetailsComponent implements OnInit {
  // icons
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faPlusCircle: IconDefinition = faPlusCircle;
  faUpload: IconDefinition = faUpload;
  faFolderPlus: IconDefinition = faFolderPlus;
  faPlusSquare = faPlusSquare;

  // diplyed columns
  displayedColumns = ['expand', 'investigationDetailType', 'button'];

  // boolean
  docPanelOpenState = true;
  addDocPanelOpenState = false;
  miscellaneousPanelState = false;
  claimsPanelOpenState = false;
  miscDocOpenState = false;

  @Input() isInvestigationExpanded: boolean;
  @Input() investigationId: number;
  @Input() investigationNumber: string;
  @Input() isOpen: boolean;
  @Input() policyNo: string;
  @Input() claimNo: string;
  @Input() investigationType: string;
  @Input() investigationGroupId: number;
  @Input() parentInvestigationDetail: InvestigationModel;

  attachedClaims: Claim[];
  claimsAttachedCount: number;
  docRequestsCount: number;
  miscDocCount: number;
  addDocRequestsCount: number;

  constructor(public dialog: MatDialog,  public detailsSharing: DetailsSharingService,) {}

  ngOnInit(): void {}
  // gets the counts of claims
  onGetClaimCount(count) {
    this.claimsAttachedCount = count;
  }

  // gets the counts of document requests
  onGetDocRequestsCount(count) {
    this.docRequestsCount = count;
  }

  onGetAddDocRequestsCount(count) {
    this.addDocRequestsCount = count;
  }

  // gets the count of miscellaneous documents
  onGetMiscDocCount(count) {
    this.miscDocCount = count;
  }

  // adds the new document request
  addNewDocumentRequest(i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-claims-popup';
    var mainClaimNum;
    if (this.parentInvestigationDetail.claimNum.length > 1) {
      mainClaimNum = this.parentInvestigationDetail.claimNum;
    } else {
      mainClaimNum = this.parentInvestigationDetail.number
        .trim()
        .substring(3, this.parentInvestigationDetail.number.trim().length - 2);
    }
    const mainClaimDetails = this.attachedClaims.find(
      (x) => x.claimNum === mainClaimNum
    );
    dialogConfig.data = {
      isEdit: false,
      investigationId: this.investigationId,
      investigationNumber: this.investigationNumber,
      investigationType: this.investigationType,
      claimNo: this.claimNo,
      policyNo: this.policyNo,
      isDenial: i === 2 ? true : false,
      parentInvestigationDetail: this.parentInvestigationDetail,
      dateOfService: mainClaimDetails.claimDate.toString(),
    };
    this.dialog.open(AddNewDocumentRequestComponent, dialogConfig);
  }

  // uploads the miscellaneous documents
  uploadMiscellaneousDocument() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-claims-popup';
    dialogConfig.data = {
      investigationId: this.investigationId,
      policyNo: this.policyNo,
      claimNo: this.claimNo,
      invNumber: this.investigationNumber,
    };
    this.dialog.open(UploadMiscDocumentPopupComponent, dialogConfig);
  }

  // gets the attached claims
  onGetAttachedClaims($event) {
    this.attachedClaims = $event;
  }

  // opens the new dialog pop up for attching claims
  onAttachClaims() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-claims-popup';
    dialogConfig.data = {
      investigationId: this.investigationId,
      investigationNumber: this.investigationNumber,
      investigationType: this.investigationType,
      attachedClaims: this.attachedClaims,
      claimNo: this.claimNo,
      policyNo: this.policyNo,
    };
    this.dialog.open(AddClaimsPopupComponent, dialogConfig);
  }
}
