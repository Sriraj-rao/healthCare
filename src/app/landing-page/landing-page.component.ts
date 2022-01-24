import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetailsSharingService } from '../core/services/details-sharing.service';
import { MsalService } from '@azure/msal-angular';
import { AdminService } from '../admin/services/admin.service';
import { PermissionsCheckingModel } from '../shared/models/permissions-checking.model';

@Component({
  selector: 'cwb-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.' + environment.cwbTheme + '.scss'],
})
export class LandingPageComponent implements OnInit {
  userName: string;
  userGreeting: string;
  userInitials: string;

  constructor(
    public detailsSharing: DetailsSharingService,
    private msalService: MsalService, private admService: AdminService
  ) { }

  ngOnInit(): void {
    this.assignUserName();
  }
  // user details are assigned here--->
  assignUserName() {
    this.userName = this.msalService.instance.getAllAccounts()[0]?.name;
    const lindex = this.userName?.lastIndexOf(',');
    const firstName = this.userName?.substring(lindex + 1).trim();
    const LastName = this.userName?.substring(0, lindex).trim();
    this.userGreeting = `Hey, ${firstName}`;
    this.userInitials = firstName?.substr(0, 1) + LastName?.substr(0, 1);
    this.detailsSharing.loggedInUserDetails.next({
      userGreeting: this.userGreeting,
      userInitials: this.userInitials,
    });
    var roles = (this.msalService.instance.getAllAccounts()[0].idTokenClaims as any).roles;
    console.log(roles);
    this.getPermissionsByRole(roles);
  }

  getPermissionsByRole(roles: string[]) {
    var permissions: string[] = [];
    var i = 0;
    for (var x of roles) {
      this.admService.getPermissionsByRole(x).subscribe(response => {
        if (response.data) {
          permissions = response.data.filter(y => permissions.findIndex(z => z.trim() === y.trim()) === -1);
          this.detailsSharing.permissions = permissions;
          console.log(this.detailsSharing.permissions)
          if (i === (roles.length - 1)) {
            this.assignPermissions(permissions);
          }
          i = i + 1;
        }
      });
    }
  }

  assignPermissions(permissions: string[]) {
    var permissionCheck: PermissionsCheckingModel = {
      isAddInvestigation: false, isViewInvestigation: false, isAddNotes: false,
      isAddPermissions: false, isAttachClaims: false, isAttachMiscDocument: false, isCloseInvestigation: false, isCloseRequest: false, isDeleteMiscDocument: false
      , isDeleteNotes: false, isDownloadMiscDocument: false, isEditNotes: false, isNewMiscDocuments: false, isNewRequest: false, isReOpenClaim: false, isReOpenInvestigation: false,
      isReminderRequest: false, isUpdateInvestigation: false, isUpdatePendCodeClaim: false, isUploadDocument: false, isViewClaims: false, isViewDocumentRequests: false,
      isViewMiscDocuments: false, isViewNotes: false, isViewReceivedDocument: false, isViewSentDocument: false
    };
    for (var x of permissions) {
      var switchValue = x.toUpperCase();
      switch (switchValue) {
        case 'AddInvestigation'.toUpperCase():
          permissionCheck.isAddInvestigation = true;
          break;
        case 'ViewInvestigation'.toUpperCase():
          permissionCheck.isViewInvestigation = true;
          break;
        case 'UpdateInvestigation'.toUpperCase():
          permissionCheck.isUpdateInvestigation = true;
          break;
        case 'CloseInvestigation'.toUpperCase():
          permissionCheck.isCloseInvestigation = true;
          break;
        case 'NewRequest'.toUpperCase():
          permissionCheck.isNewRequest = true;
          break;
        case 'ViewDocumentRequests'.toUpperCase():
          permissionCheck.isViewDocumentRequests = true;
          break;
        case 'ViewSentDocument'.toUpperCase():
          permissionCheck.isViewSentDocument = true;
          break;
        case 'UploadDocument'.toUpperCase():
          permissionCheck.isUploadDocument = true;
          break;
        case 'ViewReceivedDocument'.toUpperCase():
          permissionCheck.isViewReceivedDocument = true;
          break;
        case 'ReminderRequest'.toUpperCase():
          permissionCheck.isReminderRequest = true;
          break;
        case 'CloseRequest'.toUpperCase():
          permissionCheck.isCloseRequest = true;
          break;
        case 'AddNotes'.toUpperCase():
          permissionCheck.isAddNotes = true;
          break;
        case 'ViewNotes'.toUpperCase():
          permissionCheck.isViewNotes = true;
          break;
        case 'EditNotes'.toUpperCase():
          permissionCheck.isEditNotes = true;
          break;
        case 'DeleteNotes'.toUpperCase():
          permissionCheck.isDeleteNotes = true;
          break;
        case 'AttachClaims'.toUpperCase():
          permissionCheck.isAttachClaims = true;
          break;
        case 'UpdatePendCodeClaim'.toUpperCase():
          permissionCheck.isUpdatePendCodeClaim = true;
          break;
        case 'ReOpenInvestigation'.toUpperCase():
          permissionCheck.isReOpenInvestigation = true;
          break;
        case 'ReOpenClaim'.toUpperCase():
          permissionCheck.isReOpenClaim = true;
          break;
        case 'NewMiscDocuments'.toUpperCase():
          permissionCheck.isNewMiscDocuments = true;
          break;
        case 'DownloadMiscDocument'.toUpperCase():
          permissionCheck.isDownloadMiscDocument = true;
          break;
        case 'AttachMiscDocument'.toUpperCase():
          permissionCheck.isAttachMiscDocument = true;
          break;
        case 'DeleteMiscDocument'.toUpperCase():
          permissionCheck.isDeleteMiscDocument = true;
          break;
        case 'ViewClaims'.toUpperCase():
          permissionCheck.isViewClaims = true;
          break;
        case 'ViewMiscDocuments'.toUpperCase():
          permissionCheck.isViewMiscDocuments = true;
          break;
        case 'AddPermissions'.toUpperCase():
          permissionCheck.isAddPermissions = true;
          break;
        default:
          break;
      }
    }
    this.detailsSharing.permissionsCheck = permissionCheck;
    console.log(this.detailsSharing.permissionsCheck);
  }
}
