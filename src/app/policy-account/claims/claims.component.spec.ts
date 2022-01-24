import { ClaimsComponent } from './claims.component';
import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  async,
} from '@angular/core/testing';

import { ClaimsService } from './Services/claims-service.service';
// import { SidenavIconsService } from '../core/services/sidenav-icons.service';
// import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { DetailsSharingService } from '../../core/services/details-sharing.service';

import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const mockClaimsResults = {
  data: [],
  isSuccess: true,
};
@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private TEST_PARAMS: {};
  get testParams() {
    return this.TEST_PARAMS;
  }
  set testParams(params: {}) {
    this.TEST_PARAMS = params;
    this.subject.next(params);
  }
}

describe('ClaimsComponent', () => {
  let component: ClaimsComponent;
  let fixture: ComponentFixture<ClaimsComponent>;
  let testBedDetailsService: DetailsSharingService;
  let testBedClaimsService: ClaimsService;
  const mockResults = mockClaimsResults;
  let mockParams, mockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [ClaimsComponent],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        ClaimsService,
        DetailsSharingService,

        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.testParams = { ctrlno: '3' };
    fixture.detectChanges();
    // testBedBreadcrumbService= TestBed.get(BreadcrumbService);
    testBedDetailsService = TestBed.get(DetailsSharingService);
    testBedClaimsService = TestBed.get(ClaimsService);
    // testBedSidenavService = TestBed.get(SidenavIconsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should check the breadcrumb service', () =>{
  //   expect(testBedBreadcrumbService instanceof BreadcrumbService).toBeTruthy();
  // });

  // it('should check the sidenav icons service', () =>{
  //   expect(testBedSidenavService instanceof SidenavIconsService).toBeTruthy();
  // });

  // it('should inject breadcrumb service using inject function and check its instance', inject(
  // [BreadcrumbService],(breadCrumbService: BreadcrumbService)=>{
  //   expect(breadCrumbService).toBeTruthy();
  //   expect(breadCrumbService instanceof BreadcrumbService).toBeTruthy();
  // }));

  // it('should inject details sharing service using inject function and check its instance', inject(
  // [DetailsSharingService],(detailsService: DetailsSharingService)=>{
  //   expect(detailsService).toBeTruthy();
  //   expect(detailsService instanceof DetailsSharingService).toBeTruthy();
  // }));
  // it('should inject sidenav icons service using inject function and check its instance', inject(
  // [SidenavIconsService],(sidenavService: SidenavIconsService)=>{
  //   expect(sidenavService).toBeTruthy();
  //   expect(sidenavService instanceof SidenavIconsService).toBeTruthy();
  // }));

  // it('should check assignSidenavIcons',()=>{
  //   let assignSidenavIconsSpy=spyOn<any>(component,'assignSidenavIcons');
  //   component.ngOnInit();
  //   expect(assignSidenavIconsSpy).toHaveBeenCalled();
  // });

  it('should inject Claims service using inject function and check its instance', inject(
    [ClaimsService],
    (claimsService: ClaimsService) => {
      expect(ClaimsService).toBeTruthy();
      expect(testBedClaimsService instanceof ClaimsService).toBeTruthy();
    }
  ));

  //   it('should check Reset Filter button click calls onReset()', async(() => {
  //   spyOn<any>(component, 'onReset');
  //   let el = fixture.debugElement.query(By.css('button')).nativeElement.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.onReset).toHaveBeenCalled();
  //   });
  // }));
});
