import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { RolesModel } from '../models/roles.model';
import { PermissionsModel } from '../models/permissions.model';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { UpdatePermissions } from '../models/update-permissions.model';

@Component({
  selector: 'cwb-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  permissionsForm: FormGroup;
  roles: RolesModel[];
  permissions: PermissionsModel[];
  showPermissions = false;
  isSubmitClicked = false;

  @ViewChildren('permissionCheckbox') permissionCheckboxes: QueryList<MatCheckbox>;

  constructor(private formBuilder: FormBuilder, private admService: AdminService,
    private detailsSharing: DetailsSharingService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllRoles();
    this.getAllPermissions();
  }
  // initializes the form
  initializeForm() {
    this.permissionsForm = this.formBuilder.group({
      rolesControl: new FormControl('', [Validators.required])
    });
  }
  // gets the permissions of the particular role selected
  onRoleChanged(role: RolesModel) {
    this.getPermissionsByRoleId(role.id);
  }

  onCheckboxClicked(id: number) {
    const index = this.permissions.findIndex(x => x.id === id);
    this.permissions[index].isChecked = !this.permissions[index].isChecked;
  }
  // gets all the roles using a service call
  getAllRoles() {
    this.admService.getAllRoles().subscribe(response => {
      if (response.data) {
        this.roles = response.data;
      }
    });
  }
  // gets all permissions using a service call
  getAllPermissions() {
    this.admService.getAllPermissions().subscribe(response => {
      if (response.data) {
        this.permissions = response.data;
      }
    });
  }
  // gets the permission using a service call by passing role id as a parameter
  getPermissionsByRoleId(roleId: number) {
    this.permissionCheckboxes.forEach(c => c.checked = false);
    this.permissions.map(z => z.isChecked = false);
    this.admService.getPermissionsByRoleId(roleId).subscribe(response => {
      if (response.data) {
        this.showPermissions = true;
        for (var x of response.data) {
          const index = this.permissions.findIndex(y => y.id === x.id);
          console.log(this.permissionCheckboxes.toArray())
          if (index > -1) {
            // setTimeout(() => this.permissionCheckboxes.toArray()[index].checked = true);
            this.permissions[index].isChecked = true;
          }
        }
      }
    });
  }
  // clears the admin screen
  onClear() {
    this.isSubmitClicked = false;
    this.permissionsForm.reset();
    this.permissionsForm.clearValidators();
    this.permissionsForm.updateValueAndValidity();
    this.isSubmitClicked = false;
    this.showPermissions = false;
  }
  // submit button clicked ad asks for confirmation for submission of data
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.permissionsForm.valid) {
      this.detailsSharing.openAlertBox('Are you sure you want to update permissions ?',
        false, 'reopenInv').dialog.subscribe(
          data => {
            if (this.detailsSharing.alertDialogData.submit) {
              this.updatePermissions();
            }
          }
        );
    }
    else {
      this.detailsSharing.openSnackBar(`Please Select a Role.`, 'Dismiss', true);
    }
  }
  // updates the permissions of the role selected
  updatePermissions() {
    var permissions: PermissionsModel[] = [];
    for (var x of this.permissions) {
      if (x.isChecked) {
        permissions.push(x);
      }
    }
    var postData: UpdatePermissions = {
      roleId: this.permissionsForm.controls['rolesControl'].value.id,
      permissions: permissions
    }
    this.admService.updatePermissions(postData).subscribe(response => {
      if (response) {
        this.detailsSharing.openSnackBar(`Permissions Updated Successfully.`, 'Dismiss', false);
        this.onClear();
        window.location.reload();
      }
    });
  }

}
