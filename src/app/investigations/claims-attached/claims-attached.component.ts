import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { InvestigationsService } from '../services/investigation.service';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AttachedClaimsDetails } from 'src/app/shared/models/attached-claims-details.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  IconDefinition,
  faEnvelopeOpen,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

import { ReopenPopupComponent } from 'src/app/investigations/modals/reopen-popup/reopen-popup.component';
import { EditPendCodeComponent } from '../modals/edit-pend-code/edit-pend-code.component';
import { StateManagementService } from 'src/app/core/services/state-management.service';

@Component({
  selector: 'cwb-claims-attached',
  templateUrl: './claims-attached.component.html',
  styleUrls: ['./claims-attached.component.scss'],
})
export class ClaimsAttachedComponent implements OnInit {
  // icons
  faPen = faPen;
  faEnvelopeOpen: IconDefinition = faEnvelopeOpen;

  @Input() investigationId: number;
  @Input() investigationNumber: string;
  @Input() mainClaimNo;
  @Input() isInvestigationExpanded: boolean;
  @Output() claimCountEmitter = new EventEmitter<number>();
  @Output() attachedClaims = new EventEmitter<Claim[]>();
  @Input() isOpen: boolean;
  dataSource: MatTableDataSource<Claim>;
  claimsAttached: Claim[];
  // boolean
  isRowClicked = true;
  allClaimsClicked = true;

  private sort: MatSort;
  pendCode: number;
  claimNum: string;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  displayedColumns: string[];

  constructor(
    private invService: InvestigationsService,
    private stateMgmt: StateManagementService,
    public detailsSharing: DetailsSharingService,
    public dialog: MatDialog
  ) {
    this.detailsSharing.isInvestigationExpanded.subscribe((v) => {
      this.isInvestigationExpanded = v;
    });
  }

  ngOnInit(): void {
    this.displayedColumns  = ['claimNum','name','policyNo','diagnosis','claimDate','providerName','totalCharges','pendingAmount','pendCode','status','decision','decisionDate','paidAs'];
    if(this.detailsSharing.permissionsCheck?.isReOpenClaim || this.detailsSharing.permissionsCheck?.isUpdatePendCodeClaim){
      this.displayedColumns=[...this.displayedColumns,'reopen']
    }
    this.getAttachedClaims();
  }

  // gets the attched claims using service call
  getAttachedClaims() {
    this.invService
      .getClaimsAttached(this.investigationId, false)
      .subscribe((response) => {
        if (response.data) {
          this.claimsAttached = response.data;
          this.setDataSource();
          this.setAttachedClaimsOnService();
        }
      });
  }

  // expands all claims
  onAllRowsClicked(value: boolean) {
    this.allClaimsClicked = value;
    for (const x of this.claimsAttached) {
      x.isExpanded = this.allClaimsClicked;
      this.isRowClicked = this.allClaimsClicked;
    }
  }

  // sets the value to datasource
  setDataSource() {
    this.claimsAttached = this.claimsAttached.map((x) => {
      x.pendingAmount = x.totalCharges - x.totalPaid;
      x.isExpanded = true;
      return x;
    });
    this.dataSource = new MatTableDataSource(this.claimsAttached);
    this.dataSource.sort = this.sort;
    this.claimCountEmitter.emit(this.claimsAttached.length);
    this.attachedClaims.emit(this.claimsAttached);
  }

  // sets the attached claims using state management
  setAttachedClaimsOnService() {
    const attachedClaims: AttachedClaimsDetails = {
      investigationNumber: this.investigationNumber,
      claimsAttached: this.claimsAttached,
    };
    this.stateMgmt.setAttachedClaimsDetails(attachedClaims);
  }

  // sets the attched claims that is required for datasource
  setAttachedClaims(attachedClaims: AttachedClaimsDetails) {
    this.claimsAttached = attachedClaims.claimsAttached;
    this.setDataSource();
  }

  // reopens the investigation
  onReopenInvestigation(row) {
    this.pendCode = row.pendCode;
    this.claimNum = row.claimNum;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-reopen-popup';
    dialogConfig.data = {
      pendCode: this.pendCode,
      claimNum: this.claimNum,
      investigationNumber: this.investigationNumber,
      investigationId: this.investigationId,
    };
    this.dialog.open(ReopenPopupComponent, dialogConfig);
  }

  // edits the pendcode
  onEditPendCode(row: Claim) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-edit-pend-code-popup';
    dialogConfig.data = {
      claimNo: row.claimNum,
      invNumber: this.investigationNumber,
    };
    this.dialog.open(EditPendCodeComponent, dialogConfig);
  }
}
