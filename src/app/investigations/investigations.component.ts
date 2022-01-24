import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronRight,
  faChevronDown,
  faExpandArrowsAlt,
  faTrash,
  faPen,
  faUserPlus,
  faEnvelopeOpenText,
  faFileMedical,
  faTimesCircle,
  faWindowClose,
  faCompressArrowsAlt,
  faEdit,
  faEye,
  faFilter,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsSharingService } from '../core/services/details-sharing.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InvestigationsService } from './services/investigation.service';
import { InvestigationModel } from './models/investigation.model';
import { AddInvestigationPopupComponent } from '../shared/Modals/add-investigation-popup/add-investigation-popup.component';
import { EditInvestigationsPopupComponent } from './modals/edit-investigations-popup/edit-investigations-popup.component';
import { CloseInvestigationPopupComponent } from './modals/close-investigation-popup/close-investigation-popup.component';
import { InvestigationDetailsModel } from '../shared/models/investigations-details.model';
import { StateManagementService } from '../core/services/state-management.service';

@Component({
  selector: 'cwb-investigations',
  templateUrl: './investigations.component.html',
  styleUrls: ['./investigations.component.scss'],
})
export class InvestigationsComponent implements OnInit {
  // icons
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faEdit: IconDefinition = faEdit;
  faUserPlus = faUserPlus;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faFileMedical = faFileMedical;
  faCompressArrowsAlt = faCompressArrowsAlt;
  faEnvelopeOpenText = faEnvelopeOpenText;
  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;
  faSyncAlt: IconDefinition = faSyncAlt;
  faWindowClose = faWindowClose;
  faTimesCircle = faTimesCircle;
  faFilter: IconDefinition = faFilter;

  // boolean
  isInvestigationExpanded = false;
  isNotesExpanded: boolean;
  isInvestigationOrNoteExpanded = false;
  noRecords: boolean;
  isScrolled: boolean[] = [];

  currentID: string;
  statuses = ['All Status'];
  selectedStatus = 'All Status';
  investigationTypes = ['All Inv Types'];
  selectedinvestigationTypes = 'All Inv Types';
  selectedProofOfLoss: Date;
  selectedPendCode = '';
  currentClaimNumber: string;
  invName: string;
  invAddress: string;
  effectiveDate: string;
  policyEffectiveDate: string;
  investigationDetails: InvestigationModel[] = [];
  isViewAllInvestigations: boolean;
  isSidenavExpanded: boolean;
  invId: string;

  investigationGroupId: number;
  @ViewChildren('invHeader') invHeader: QueryList<ElementRef>;
  @ViewChildren('invContent') invContent: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private stateMgmt: StateManagementService,
    public detailsSharing: DetailsSharingService,
    private invService: InvestigationsService
  ) {
    this.detailsSharing.addNewlyCreatedInvestigation.subscribe((v) => {
      if (v) {
        this.addNewlyCreatedInvestigation(v);
      }
    });
    this.detailsSharing.reloadSingleInvestigation.subscribe((v) => {
      if (v) {
        this.reloadSingleInvestigation(v);
      }
    });
  }

  ngOnInit(): void {
    this.isNotesExpanded = false;
    this.detailsSharing.isSidenavExpanded.subscribe((v) => {
      this.isSidenavExpanded = v;
    });
    this.getInvestigations();
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
  //   for (var x in this.investigationDetails) {
  //     if (this.investigationDetails[x].isInvestigationRowClicked) {
  //       if (this.invContent.toArray()[x]) {
  //         if (
  //           window.scrollY >=
  //             this.invContent.toArray()[x].nativeElement.offsetTop - 180 &&
  //           window.scrollY <
  //             this.invContent.toArray()[x].nativeElement.offsetHeight +
  //               this.invContent.toArray()[x].nativeElement.offsetTop -
  //               230
  //         ) {
  //           this.isScrolled[x] = true;
  //           this.invHeader
  //             .toArray()
  //             [x].nativeElement.setAttribute(
  //               'style',
  //               'width:' +
  //                 this.invContent.toArray()[x].nativeElement.offsetWidth +
  //                 'px'
  //             );
  //           this.invContent
  //             .toArray()
  //             [x].nativeElement.setAttribute(
  //               'style',
  //               'margin-top:' + 200 + 'px'
  //             );
  //         } else {
  //           this.isScrolled[x] = false;
  //           this.invContent
  //             .toArray()
  //             [x].nativeElement.setAttribute('style', 'margin-top:' + 0 + 'px');
  //         }
  //       }
  //     }
  //   }
  // }

  // Assign the investigation details to a variable
  assignInvestigationDetails() {
    const investigationDetails = this.stateMgmt.getInvestigationDetails();
    this.policyEffectiveDate = investigationDetails.policyEffectiveDate;
    this.noRecords = investigationDetails.noRecords;
    this.isViewAllInvestigations = investigationDetails.isViewAllInvestigations;
    this.investigationGroupId = investigationDetails.investigationGroupId;
    this.investigationDetails = investigationDetails.investigationDetails;
    this.invName = investigationDetails.invName;
    this.invId = investigationDetails.invId;
    this.invAddress = investigationDetails.invAddress;
    this.effectiveDate = investigationDetails.effectiveDate;
    this.currentID = investigationDetails.currentID;
    if (this.investigationDetails.length > 1) {
      this.initializeRowsClicked(false, true);
      this.initializeFilterFields(this.investigationDetails);
    } else {
      this.initializeRowsClicked(true, true);
    }
  }

  // assigning the inv details on service
  assignInvestigationDetailsOnService() {
    const investigationDetails: InvestigationDetailsModel = {
      currentID: this.currentID,
      effectiveDate: this.effectiveDate,
      invAddress: this.invAddress,
      invId: this.invId,
      invName: this.invName,
      investigationDetails: this.investigationDetails,
      isViewAllInvestigations: this.isViewAllInvestigations,
      noRecords: this.noRecords,
      policyEffectiveDate: this.policyEffectiveDate,
      investigationGroupId: this.investigationGroupId,
    };
    this.stateMgmt.setInvestigationDetails(investigationDetails);
  }

  // gets the investigations
  getInvestigations() {
    this.invName = this.detailsSharing.invName;
    this.invAddress = this.detailsSharing.invAddress;
    this.route.queryParamMap.subscribe((params) => {
      const invId = params.get('invId');
      this.invId = invId;
      this.route.params.subscribe((params: Params) => {
        this.currentID = params.id;
        if (this.stateMgmt.getInvestigationDetails() != null) {
          this.assignInvestigationDetails();
        } else {
          this.stateMgmt.setAllInvDetailsToEmpty();
          if (this.currentID) {
            if (invId === 'true') {
              this.currentClaimNumber = this.detailsSharing.invClaimNumber;
              if (this.currentID.startsWith('INV')) {
                this.getInvestigationById('1', this.currentID, false);
              }
            }
            if (invId === 'search') {
              this.currentClaimNumber = this.detailsSharing.invClaimNumber;
              if (this.currentID.startsWith('INV')) {
                this.getInvestigationById('1', this.currentID, true);
              }
            }
            if (invId === 'false') {
              if (!this.currentID.startsWith('INV')) {
                this.isViewAllInvestigations = false;
                this.currentClaimNumber = this.currentID;
                this.getInvestigationsByClaimNumber(this.currentClaimNumber);
              }
            }
          }
        }
      });
    });
  }

  // gets the investigation by id
  getInvestigationById(invID, invNumber, isSearch: boolean) {
    this.invService
      .getInvestigationByID(invID, invNumber)
      .subscribe((response) => {
        if (response.data) {
          this.isViewAllInvestigations =
            response.data.isMultipleInvestigationsAvailable;
          this.noRecords = false;
          this.investigationDetails = [];
          this.investigationDetails.push(response.data);
          this.investigationGroupId =
            this.investigationDetails[0].investigationGroupId;
          this.initializeRowsClicked(true);
          this.policyEffectiveDate =
            this.investigationDetails[0].policyEffectiveDate;
        } else {
          this.noRecords = true;
          this.detailsSharing.openSnackBar(
            'Could not retreive investigations for investigation ' +
            invID +
            '. Please try again.',
            'Dismiss',
            true
          );
        }
        if (isSearch === false) {
          this.getEffectiveDate('1', this.currentClaimNumber);
        }
      });
  }

  // reloads the single investigation
  reloadSingleInvestigation(invNumber: string) {
    this.invService
      .getInvestigationByID('1', invNumber)
      .subscribe((response) => {
        if (response.data) {
          const invDetail = response.data;
          this.investigationDetails = this.investigationDetails.map((obj) =>
            obj.investigationId === invDetail.investigationId
              ? {
                ...invDetail,
                isInvestigationRowClicked: obj.isInvestigationRowClicked,
              }
              : obj
          );
          this.initializeFilterFields(this.investigationDetails);
          this.assignInvestigationDetailsOnService();
        }
      });
  }

  // adds the newly created investigation
  addNewlyCreatedInvestigation(v: number) {
    this.invService
      .getInvestigationByID(v.toString(), '')
      .subscribe((response) => {
        if (response.data) {
          const invDetail = response.data;
          this.investigationDetails.push(invDetail);
          this.initializeFilterFields(this.investigationDetails);
          this.assignInvestigationDetailsOnService();
        }
      });
  }

  // gets the investigation by claim number
  getInvestigationsByClaimNumber(claimNumber) {
    this.invService
      .getInvestigationsByClaimNumber(claimNumber)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.noRecords = false;
          this.investigationDetails = response.data;
          this.investigationGroupId = response.data[0].investigationGroupId;
          this.policyEffectiveDate =
            this.investigationDetails[0].policyEffectiveDate;
          this.initializeRowsClicked(false);
          this.initializeFilterFields(this.investigationDetails);
        } else {
          this.noRecords = true;
          this.detailsSharing.openSnackBar(
            'No Records Found for Claim Number ' + claimNumber,
            'Dismiss',
            true
          );
        }
        this.getEffectiveDate('1', this.currentClaimNumber);
      });
  }

  // method when single investigation is expanded
  onSingleInvestigationExpanded(i) {
    if ((this.detailsSharing.permissionsCheck?.isViewDocumentRequests || this.detailsSharing.permissionsCheck?.isViewMiscDocuments || this.detailsSharing.permissionsCheck?.isViewClaims)) {
    i.isInvestigationRowClicked=
        !i.isInvestigationRowClicked;
    const invDetails = this.stateMgmt.getInvestigationDetails();
    this.stateMgmt.setInvestigationDetails({
        ...invDetails,
        investigationDetails: this.investigationDetails,
      });
    }
  }

  // initializes the values of the inv details row clicked
  initializeRowsClicked(byId: boolean, alreadyInit?: boolean) {
    if ((this.detailsSharing.permissionsCheck?.isViewDocumentRequests|| this.detailsSharing.permissionsCheck.isNewMiscDocuments|| this.detailsSharing.permissionsCheck.isNewRequest|| this.detailsSharing.permissionsCheck.isAttachClaims || this.detailsSharing.permissionsCheck?.isViewMiscDocuments || this.detailsSharing.permissionsCheck?.isViewClaims)) {
      this.investigationDetails = this.investigationDetails.map((x, i) => {
        if (!alreadyInit) {
          if (i === 0) {
            x.isInvestigationRowClicked = true;
          } else {
            x.isInvestigationRowClicked = false;
          }
        }
        return x;
      });
    }
    if (byId) {
      if (!this.invName) {
        this.invName = this.investigationDetails[0].claimant;
      }
      if (!this.invAddress) {
        this.invAddress = this.investigationDetails[0].address;
      }
      if (!this.effectiveDate) {
        this.getEffectiveDate(this.investigationDetails[0].investigationId, '');
      }
    }
  }

  // initializes the filter fields
  initializeFilterFields(investigationDetails: InvestigationModel[]) {
    this.statuses = ['All Status'];
    this.investigationTypes = ['All Inv Types'];
    for (const element of investigationDetails) {
      if (!this.investigationTypes.includes(element.investigationSubCategory)) {
        this.investigationTypes.push(element.investigationSubCategory);
      }
      if (!this.statuses.includes(element.investigationStatus)) {
        if (!(element.investigationStatus === 'Reopen')) {
          this.statuses.push(element.investigationStatus);
        }
      }
    }
  }

  // allows the user to select the pend code using keyboard
  onKeyUp($event) {
    this.selectedPendCode = $event;
  }

  // allows the selection of date
  onDateChange($event) {
    this.selectedProofOfLoss = new Date($event);
  }

  // resets the filter values
  onResetFilters() {
    this.selectedPendCode = '';
    this.selectedProofOfLoss = null;
    this.selectedStatus = 'All Status';
    this.selectedinvestigationTypes = 'All Inv Types';
  }

  // gets the effective date using the service call
  getEffectiveDate(invID, claimNumber) {
    this.invService
      .getEffectiveDate(invID, claimNumber)
      .subscribe((response) => {
        if (response.data) {
          this.effectiveDate = response.data;
        }
        this.assignInvestigationDetailsOnService();
      });
  }
  // dispalys all the related investigations
  onViewRelatedInvestigations() {
    if (!this.currentClaimNumber) {
      this.currentClaimNumber = this.investigationDetails[0].claimNum;
    }
    this.detailsSharing.invForRoute.next({
      name: this.currentClaimNumber,
      query: 'invId',
      value: false,
    });
    this.stateMgmt.setInvestigationDetails(null);
    this.router.navigate(['investigations', this.currentClaimNumber], {
      queryParams: {
        invId: false,
      },
    });
  }

  // reopens an investigation
  onReopenInvestigation(investigationDetail: InvestigationModel) {
    this.onEditInvestigation(investigationDetail);
  }

  // adds a new investigation
  onAddInvestigation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-investigation-popup';
    dialogConfig.data = {
      claimNumber: this.currentClaimNumber
        ? this.currentClaimNumber
        : this.investigationDetails[0].claimNum,
      claimantName: this.invName,
      onInvestigations: true,
      policyEffectiveDate: this.policyEffectiveDate,
    };
    this.dialog.open(AddInvestigationPopupComponent, dialogConfig);
  }
  // expands the investigation screen
  onInvestigationExpand() {
    this.isInvestigationExpanded = !this.isInvestigationExpanded;

    this.detailsSharing.isInvestigationExpanded.next(
      this.isInvestigationExpanded
    );
    this.isInvestigationOrNoteExpanded = !this.isInvestigationOrNoteExpanded;
  }

  // edits an investigation screen
  onEditInvestigation(investigationDetail: InvestigationModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-investigation-popup';
    dialogConfig.data = {
      invID: investigationDetail.investigationId,
      invNumber: investigationDetail.number,
      invStatus: investigationDetail.investigationStatus,
      invType: investigationDetail.investigationSubCategory,
      invPendCode: investigationDetail.pendCode,
      invCatId: investigationDetail.investigationCategoryId,
      invConditionId: investigationDetail.investigationSubCategoryId,
      invStatusId: investigationDetail.investigationStatusId,
      catName: investigationDetail.investigationSubCategory,
    };
    this.dialog.open(EditInvestigationsPopupComponent, dialogConfig);
  }

  // opens the close investigation popup
  onCloseInvestigation(investigationDetail: InvestigationModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-investigation-popup';
    dialogConfig.data = {
      investigationId: investigationDetail.investigationId,
      investigationNumber: investigationDetail.number,
    };
    this.dialog.open(CloseInvestigationPopupComponent, dialogConfig);
  }

  // reloads the current page
  reloadCurrentPage() {
    this.onResetFilters();
    this.stateMgmt.setInvestigationDetails(null);
    this.ngOnInit();
  }
}
