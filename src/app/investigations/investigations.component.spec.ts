import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { CoreModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
// import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { DetailsSharingService } from '../core/services/details-sharing.service';
import { MaterialModule } from '../shared/material/material.module';
import { AddInvestigationPopupComponent } from '../shared/Modals/add-investigation-popup/add-investigation-popup.component';
import { ViewClaimsDetailsPopupComponent } from '../shared/Modals/view-claims-details-popup/view-claims-details-popup.component';
import { SharedModule } from '../shared/shared.module';
import { InvestigationsRoutingModule } from './investigations-routing.module';

import { InvestigationsComponent } from './investigations.component';
import { InvestigationsModule } from './investigations.module';
import { InvestigationTypePipe } from './pipes/investigation-type.pipe';
import { PendCodePipe } from './pipes/pend-code.pipe';
import { ProofOfLossPipe } from './pipes/proof-of-loss.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { InvestigationsService } from './services/investigation.service';

const mockClaimResults = {
  data: [],
  isSuccess: true,
};

const mockInvResults = {
  data: {
    investigationId: 0,
    investigationSubCategory: 'string',
    investigationStatus: 'string',
    number: 'string',
    effectiveDate: '2021-04-15T09:30:41.777Z',
    lastActivity: '2021-04-15T09:30:41.777Z',
    proofOfLoss: '2021-04-15T09:30:41.777Z',
    pendCode: 0,
    age: 0,
    totalCharges: 0,
    totalAmountAfterDiscount: 0,
  },
  isSuccess: true,
};

const effMockResults = {
  data: '',
  isSuccess: true,
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private localTestParams: {};
  get testParams() {
    return this.localTestParams;
  }
  set testParams(params: {}) {
    this.localTestParams = params;
    this.subject.next(params);
  }
}

describe('InvestigationsComponent', () => {
  let component: InvestigationsComponent;
  let fixture: ComponentFixture<InvestigationsComponent>;
  let testBedInvestigationService: InvestigationsService;
  // let testBedBreadcrumbService: BreadcrumbService;
  let testBedDetailsService: DetailsSharingService;
  const mockResults = mockInvResults;
  const mockClaim = mockClaimResults;
  const mockEff = effMockResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InvestigationsComponent,
        AddInvestigationPopupComponent,
        ViewClaimsDetailsPopupComponent,
        PendCodePipe,
        ProofOfLossPipe,
        InvestigationTypePipe,
        StatusPipe
      ],
      imports: [
        HttpClientTestingModule,
        InvestigationsRoutingModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        // InvestigationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedInvestigationService = TestBed.get(InvestigationsService);
    // testBedBreadcrumbService=TestBed.get(BreadcrumbService);
    testBedDetailsService = TestBed.get(DetailsSharingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the InvestigationService service', () => {
    expect(
      testBedInvestigationService instanceof InvestigationsService
    ).toBeTruthy();
  });

  it('should inject ClaimsService service using inject function and check its instance', inject(
    [InvestigationsService],
    (testBedInvestigationService: InvestigationsService) => {
      expect(InvestigationsService).toBeTruthy();
      expect(
        testBedInvestigationService instanceof InvestigationsService
      ).toBeTruthy();
    }
  ));

  // it('should check ngOnInIt function calls getInvestigationById',()=>{
  //   let insSummarySpy=spyOn<any>(component,'getInvestigationById');
  //   component.ngOnInit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('testing subscribe method is getting called', fakeAsync(()=>{
  //   let getInsuredSpy= spyOn(testBedInvestigationService,'getInvestigationByID')
  // .and.returnValue(of(mockResults));
  //   let subSpy= spyOn(testBedInvestigationService.getInvestigationByID('0','INV192674077G01'), 'subscribe');
  //   component['getInvestigationById']('0','INV192674077G01');
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
  //   expect(subSpy).toHaveBeenCalled();
  // }));

  // it('should check the breadcrumb service', () =>{
  //   expect(testBedBreadcrumbService instanceof BreadcrumbService).toBeTruthy();
  // });

  it('should check the details sharing service', () => {
    expect(testBedDetailsService instanceof DetailsSharingService).toBeTruthy();
  });
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

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInvestigationService,
      'getInvestigationsByClaimNumber'
    ).and.returnValue(of(mockClaim));
    const subSpy = spyOn(
      testBedInvestigationService.getInvestigationsByClaimNumber(' 192674429G'),
      'subscribe'
    );
    component.getInvestigationsByClaimNumber(' 192674429G');
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInvestigationService,
      'getEffectiveDate'
    ).and.returnValue(of(mockEff));
    const subSpy = spyOn(
      testBedInvestigationService.getEffectiveDate('0', ' 192674429G'),
      'subscribe'
    );
    component.getEffectiveDate('0', ' 192674429G');
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));
});
