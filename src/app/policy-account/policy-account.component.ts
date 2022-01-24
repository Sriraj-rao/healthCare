import { Component, OnInit } from '@angular/core';
import { AccountStatuses } from '../shared/enums/policy/account-statuses.enum';
import { ContactInfo } from '../shared/models/contact-info.model';
import {
  faBalanceScale,
  faExclamationTriangle,
  faBan,
  faLeaf,
  faSync,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faPauseCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { DetailsSharingService } from '../core/services/details-sharing.service';
import { AssociationState } from '../shared/enums/policy/association-state.enum';
import { ActivatedRoute, Params } from '@angular/router';
import { PolicyAccountsService } from './services/policy-account.service';
import { environment } from 'src/environments/environment';
import { PPONetwork } from '../shared/models/ppo-network.model';
import { PolicyAccountDetails } from '../shared/models/policy-account-details.model';
import { StateManagementService } from '../core/services/state-management.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationPopupModalRequest } from './models/notification-popup.model';
import { NotificationDisplay } from './models/notifications-display..model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsComponent } from './modals/notifications/notifications.component';

@Component({
  selector: 'cwb-policy-account',
  templateUrl: './policy-account.component.html',
  styleUrls: ['./policy-account.component.' + environment.cwbTheme + '.scss'],
})
export class PolicyAccountComponent implements OnInit {
  // icons
  faBalanceScale = faBalanceScale;
  faCertificate = faCertificate;
  faExclamationTriangle = faExclamationTriangle;
  faBan = faBan;
  faLeaf = faLeaf;
  faEnvelope = faEnvelope;
  faSync = faSync;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faPauseCircle = faPauseCircle;

  accountStatusOptions = AccountStatuses;
  currentPolicyNo: string;
  distinctControlNos: string[] = [];
  policyHolder: ContactInfo;
  ppoInformation: PPONetwork[] = [];
  currentAccountStatuses = [];
  policyDetails: PolicyAccountDetails;
  assocStateClassName = '';
  // icons
  isCurrentAccountStatuses = false;
  isPPONetwork = false;
  selectedTab: number;
  isInsuredSelected = true;
  isClaimsSelected = false;
  isSearchByClaims: boolean;
  isInvestigationSelected = false;
  benefitsUrl: SafeResourceUrl;
  notifications: NotificationDisplay[];

  constructor(
    private _policyAccountService: PolicyAccountsService,
    private stateMgmt: StateManagementService,
    public _detailsSharing: DetailsSharingService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.benefitsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://cd-dev.ushealthgroup.com/BenefitsNew.aspx?pno=52M459735B'
    );
  }

  ngOnInit(): void {
    this.getContactInfo();
  }

  // gets the contact info
  getContactInfo() {
    this.route.queryParamMap.subscribe((params) => {
      this._detailsSharing.isClaimsTabClicked.next(false);
      const claimNo = params.get('claims');
      if (claimNo) {
        this.isSearchByClaims = true;
        this.selectedTab = 1;
      } else {
        this.selectedTab = 0;
        this.isSearchByClaims = false;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this._detailsSharing.isClaimsTabClicked.next(false);
      this.isClaimsSelected = false;
      this.currentPolicyNo = params.ctrlno;
      this._detailsSharing.currentPolicyNo = this.currentPolicyNo;
      this._detailsSharing.policyForRoute.next(this.currentPolicyNo);
      if (
        this.stateMgmt.getPolicyDetails() != null &&
        this.stateMgmt.getPolicyDetails().currentPolicyNo ===
          this.currentPolicyNo
      ) {
        this.assignPolicyDetails();
      } else {
        this.getContactInfoByPolicyControlNo();
      }
    });
  }
  // method to assign the policy details to a variable
  assignPolicyDetails() {
    const policyDetails = this.stateMgmt.policyDetails;
    this.currentPolicyNo = policyDetails.currentPolicyNo;
    this.currentAccountStatuses = policyDetails.currentAccountStatuses;
    this.isCurrentAccountStatuses = policyDetails.isCurrentAccountStatuses;
    this.policyHolder = policyDetails.policyHolder;
    this.selectedTab = policyDetails.selectedTab;
    this.ppoInformation = policyDetails.ppoInformation;
    this.setAssociatedStateClass();
  }

  // assignimg the policy details using state management
  assignPolicyDetailsOnService() {
    const policyDetails: PolicyAccountDetails = {
      currentPolicyNo: this.currentPolicyNo,
      currentAccountStatuses: this.currentAccountStatuses,
      isCurrentAccountStatuses: this.isCurrentAccountStatuses,
      policyHolder: this.policyHolder,
      ppoInformation: this.ppoInformation,
      selectedTab: this.selectedTab,
    };
    this.stateMgmt.setPolicyDetails(policyDetails);
  }

  // changes the tab based on the event selected
  tabSelectionChanged($event) {
    this.selectedTab = $event;
    if (this.selectedTab === 0) {
      this.isClaimsSelected = false;
      this.isInvestigationSelected = false;
    }
    if (this.selectedTab === 1) {
      if (!this.isClaimsSelected) {
        this._detailsSharing.isClaimsTabClicked.next(true);
      }
      this.isClaimsSelected = true;
      this.isInvestigationSelected = false;
    }
    if (this.selectedTab === 2) {
      if (!this.isInvestigationSelected) {
        this._detailsSharing.isInvestigationTabClicked.next(true);
      }
      this.isInvestigationSelected = true;
      this.isClaimsSelected = false;
    }
    this.assignPolicyDetailsOnService();
  }
  // selection for insured tab
  onNameClicked() {
    this.selectedTab = 1;
  }
  // gets the contact info using policy control number
  getContactInfoByPolicyControlNo() {
    if (this.isSearchByClaims) {
      this.selectedTab = 1;
    } else {
      this.selectedTab = 0;
    }
    this.policyHolder = null;
    this._policyAccountService
      .getContactInfoByPolicyControlNo(this.currentPolicyNo)
      .subscribe((response) => {
        this.policyHolder = response.data;
        this._detailsSharing.invAddress = this.policyHolderAddress();
        this.getAccountStatuses();
        this.getNotificationPopups(
          this.policyHolder.state,
          this.currentPolicyNo
        );
      });
  }
  // gets the statuses of the account using service call
  getAccountStatuses() {
    this.currentAccountStatuses = null;
    this._policyAccountService
      .getAccountStatusIndicators(this.currentPolicyNo)
      .subscribe((response) => {
        if (response.isSuccess === true) {
          this.currentAccountStatuses = response.data;
          this.setAssociatedStateClass();
        }
        this.isCurrentAccountStatuses = true;
        this.getPpoInformation();
      });
  }
  // gets the ppo information
  getPpoInformation() {
    this.ppoInformation = null;
    this._policyAccountService
      .getAccountPPOInformation(this.currentPolicyNo)
      .subscribe((response) => {
        if (response.isSuccess === true) {
          this.ppoInformation = response.data;
        }
        this.assignPolicyDetailsOnService();
      });
  }

  getNotificationPopups(state: string, policyNo: string) {
    const apiRequest: NotificationPopupModalRequest = {
      state,
      policyNumber: policyNo,
    };

    this._policyAccountService
      .getNotificationPopups(apiRequest)
      .subscribe((response) => {
        this.notifications = response.data;
        if (this.notifications.length > 0) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.id = 'cwb-notifications-popup';
          dialogConfig.data = {
            notifications: this.notifications,
          };
          this.dialog.open(NotificationsComponent, dialogConfig);
        }
      });
  }
  // toggles the ppo network
  togglePPONetwork() {
    this.isPPONetwork = !this.isPPONetwork;
  }
  // sets the associated state class
  setAssociatedStateClass() {
    if (
      this.currentAccountStatuses[
        this.accountStatusOptions.IsAssociationState
      ] !== null &&
      this.currentAccountStatuses[
        this.accountStatusOptions.IsAssociationState
      ] !== undefined
    ) {
      switch (
        this.currentAccountStatuses[
          this.accountStatusOptions.IsAssociationState
        ].Value
      ) {
        case AssociationState.Yes:
          this.assocStateClassName = AssociationState.Yes.toLowerCase();
          break;
        case AssociationState.No:
          this.assocStateClassName = AssociationState.No.toLowerCase();
          break;
        case AssociationState.Optional:
          this.assocStateClassName = AssociationState.Optional.toLowerCase();
          break;
        case AssociationState.Invalid:
          this.assocStateClassName = AssociationState.Invalid.toLowerCase();
          break;
        default:
          break;
      }
    }
  }
  // gets the address of the policy holder
  policyHolderAddress(): string {
    if (!!!this.policyHolder) {
      return 'NO ADDRESS PROVIDED';
    }
    let street = this.policyHolder.address || '';
    let city = this.policyHolder.city || '';
    const state = this.policyHolder.state || '';
    const zipCode = this.policyHolder.zip || '';
    street = street === '' ? street : `${street}`;
    city = city === '' ? city : `${city},`;
    const addr = `${street} ${city} ${state} ${zipCode}`.trim();
    return addr;
  }

  associationStatus(): string {
    const status: string =
      this.currentAccountStatuses[this.accountStatusOptions.IsAssociationState]
        .Text;
    const splitResults = status.split('-');
    return splitResults.length > 1 ? splitResults[1] : status;
  }
}
