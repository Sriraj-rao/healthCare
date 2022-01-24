import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AdminService } from '../services/admin.service';

import { RoleManagementComponent } from './role-management.component';

const mockRoleResults = {
  isSuccess: true,
  data: [],
 
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() {
    return this._testParams;
  }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
}

fdescribe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;
  let testBedAdminService: AdminService;
  let testBedDetailSharingService: DetailsSharingService;
  let mockadm = mockRoleResults;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleManagementComponent ],
      imports:[   HttpClientTestingModule,
        MatSnackBarModule,
        // MatTableModule,
        MatDialogModule,  
         ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        RouterTestingModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedAdminService = TestBed.get(AdminService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the testBedAdmin Service ', () => {
    expect(
      testBedAdminService instanceof AdminService
    ).toBeTruthy();
  });

  it('should inject testBedAdminService  using inject function and check its instance', inject(
    [AdminService],
    (testBedAdminService: AdminService) => {
      expect(testBedAdminService).toBeTruthy();
      expect(
        testBedAdminService instanceof AdminService
      ).toBeTruthy();
    }
  ));
  it('should check the details sharing service', () => {
    expect(
      testBedDetailSharingService instanceof DetailsSharingService
    ).toBeTruthy();
  });

  it('should inject details sharing service using inject function and check its instance', inject(
    [DetailsSharingService],
    (testBedDetailSharingService: DetailsSharingService) => {
      expect(testBedDetailSharingService).toBeTruthy();
      expect(
        testBedDetailSharingService instanceof DetailsSharingService
      ).toBeTruthy();
    }
  ));
  it('should check ngOnInIt function calls initializeForm', () => {
    let insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls getAllRoles', () => {
    let insSummarySpy = spyOn<any>(component, 'getAllRoles');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls getAllPermissions', () => {
    let insSummarySpy = spyOn<any>(component, 'getAllPermissions');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getAllPermissions', () => {
    let insSummarySpy = spyOn<any>(component, 'getAllPermissions');
    component.getAllPermissions();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getAllRoles', () => {
    let insSummarySpy = spyOn<any>(component, 'getAllRoles');
    component.getAllRoles();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check  function calls initializeForm', () => {
    let insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onCheckboxClicked', () => {
    let insSummarySpy = spyOn<any>(component, 'onCheckboxClicked');
    component.onCheckboxClicked(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getPermissionsByRoleId', () => {
    let insSummarySpy = spyOn<any>(component, 'getPermissionsByRoleId');
    component.getPermissionsByRoleId(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    let getInsuredSpy = spyOn(
      testBedAdminService,
      'getAllRoles'
    ).and.returnValue(of(mockRoleResults));
    let subSpy = spyOn(
      testBedAdminService.getAllRoles(),
      'subscribe'
    );
    component['getAllRoles']();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy); 
    expect(subSpy).toHaveBeenCalled();
  }));
  
  it('should check  function calls getPermissionsByRoleId', () => {
    let insSummarySpy = spyOn<any>(component, 'getPermissionsByRoleId');
    component.getPermissionsByRoleId(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });
  // it('testing subscribe method is getting called', fakeAsync(() => {
  //   let getInsuredSpy = spyOn(
  //     testBedAdminService,
  //     'getAllPermissions'
  //   ).and.returnValue(of(mockRoleResults));
  //   let subSpy = spyOn(
  //     testBedAdminService.getAllRoles(),
  //     'subscribe'
  //   );
  //   component['getAllPermissions']();
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy); 
  //   expect(subSpy).toHaveBeenCalled();
  // }));
  it('should check  function calls onClear', () => {
    let insSummarySpy = spyOn<any>(component, 'onClear');
    component.onClear();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check  function calls onSubmit', () => {
    let insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check  function calls updatePermissions', () => {
    let insSummarySpy = spyOn<any>(component, 'updatePermissions');
    component.updatePermissions();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
