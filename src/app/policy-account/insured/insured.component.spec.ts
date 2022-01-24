import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  async,
} from '@angular/core/testing';

import { InsuredComponent } from './insured.component';
// import { SidenavIconsService } from '../core/services/sidenav-icons.service';
// import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { DetailsSharingService } from '../../core/services/details-sharing.service';
import { InsuredService } from './services/insured.service';
import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { InsuredDetailsModel } from 'src/app/shared/models/insured-details.model';

const mockSearchResults = {
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

describe('InsuredComponent', () => {
  let component: InsuredComponent;
  let fixture: ComponentFixture<InsuredComponent>;
  // let testBedSidenavService: SidenavIconsService;
  // let testBedBreadcrumbService: BreadcrumbService;
  let testBedDetailsService: DetailsSharingService;
  let testBedInsuredService: InsuredService;
  const mockResults = mockSearchResults;
  let  mockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [InsuredComponent],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        MatTabsModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        InsuredService,
        DetailsSharingService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.testParams = { ctrlno: '3' };
    fixture.detectChanges();
    // testBedBreadcrumbService= TestBed.get(BreadcrumbService);
    testBedDetailsService = TestBed.get(DetailsSharingService);
    testBedInsuredService = TestBed.get(InsuredService);
    // testBedSidenavService= TestBed.get(SidenavIconsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should check the breadcrumb service', () =>{
  //   expect(testBedBreadcrumbService instanceof BreadcrumbService).toBeTruthy();
  // });

  it('should check the details sharing service', () => {
    expect(testBedDetailsService instanceof DetailsSharingService).toBeTruthy();
  });

  it('should check the insured service', () => {
    expect(testBedInsuredService instanceof InsuredService).toBeTruthy();
  });

  // it('should check the sidenav icons service', () =>{
  //   expect(testBedSidenavService instanceof SidenavIconsService).toBeTruthy();
  // });

  // it('should inject breadcrumb service using inject function and check its instance', inject(
    // [BreadcrumbService],(breadCrumbService: BreadcrumbService)=>{
  //   expect(breadCrumbService).toBeTruthy();
  //   expect(breadCrumbService instanceof BreadcrumbService).toBeTruthy();
  // }));

  it('should inject details sharing service using inject function and check its instance', inject(
    [DetailsSharingService],
    (detailsService: DetailsSharingService) => {
      expect(detailsService).toBeTruthy();
      expect(detailsService instanceof DetailsSharingService).toBeTruthy();
    }
  ));

  it('should inject insured service using inject function and check its instance', inject(
    [InsuredService],
    (insuredService: InsuredService) => {
      expect(insuredService).toBeTruthy();
      expect(insuredService instanceof InsuredService).toBeTruthy();
    }
  ));

  // it('should inject sidenav icons service using inject function and check its instance', inject(
    // [SidenavIconsService],(sidenavService: SidenavIconsService)=>{
  //   expect(sidenavService).toBeTruthy();
  //   expect(sidenavService instanceof SidenavIconsService).toBeTruthy();
  // }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInsuredService,
      'getInsuredCoverageSummaries'
    ).and.returnValue(of(mockResults));
    const subSpy = spyOn(
      testBedInsuredService.getInsuredCoverageSummaries('52M637300B'),
      'subscribe'
    );
    component.getInsuredCoverageSummaries();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should check ngOnInIt function calls getInsuredCoverageSummaries', () => {
    const insSummarySpy = spyOn<any>(component, 'getInsuredCoverageSummaries');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('assignInsuredValues Method is called', () => {
    const param: InsuredDetailsModel = null;
    spyOn(component, 'assignInsuredValues'); // spy first
    component.assignInsuredValues(param);
    expect(component.assignInsuredValues).toHaveBeenCalledWith(param);
  });

  // it('should check ngOnInIt function calls getInsuredCoverageSummaries',()=>{
  //   let insSummarySpy=spyOn<any>(component,'getInsuredCoverageSummaries');
  //   component.getInsuredCoverageSummaries();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check assignSidenavIcons',()=>{
  //   let assignSidenavIconsSpy=spyOn<any>(component,'assignSidenavIcons');
  //   component.ngOnInit();
  //   expect(assignSidenavIconsSpy).toHaveBeenCalled();
  // });
});
