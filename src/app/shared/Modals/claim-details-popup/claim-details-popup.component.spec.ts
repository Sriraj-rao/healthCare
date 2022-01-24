import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';

import { ClaimDetailsPopupComponent } from './claim-details-popup.component';

const mockClaimResults = {
  data: [],
  isSuccess: true
};
@Injectable()
export class ActivatedRouteStub
{
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    private TEST_PARAMS: {};
    get testParams() { return this.TEST_PARAMS; }
    set testParams(params: {}) {
        this.TEST_PARAMS = params;
        this.subject.next(params);
    }
}

describe('ClaimDetailsPopupComponent', () => {
  let component: ClaimDetailsPopupComponent;
  let fixture: ComponentFixture<ClaimDetailsPopupComponent>;
  let testBedClaimDetailsPopupService: ClaimsService;
  const mockResults = mockClaimResults;
  let mockParams, mockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [ ClaimDetailsPopupComponent ],
      imports: [
      HttpClientTestingModule,
    RouterTestingModule, MatDialogModule],
      providers: [ClaimsService,
        {provide: ActivatedRoute, useValue: mockActivatedRoute, },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {   provide: MatDialogRef,
          useValue: {}
        },


        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedClaimDetailsPopupService = TestBed.get(ClaimsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the ClaimsPopupService service', () => {
    expect(testBedClaimDetailsPopupService instanceof ClaimsService).toBeTruthy();
  });

  it('should inject ClaimsService service using inject function and check its instance',
   inject([ClaimsService], (testBedClaimDetailsPopupService: ClaimsService) => {
    expect(ClaimsService).toBeTruthy();
    expect(testBedClaimDetailsPopupService instanceof ClaimsService).toBeTruthy();
  }));

  it('should check ngOnInIt function calls getClaimantDetails', () => {
    const insSummarySpy = spyOn<any>(component, 'getClaimantDetails');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(testBedClaimDetailsPopupService, 'getViewClaimDetailsByClaimNumber').and.returnValue(of(mockResults));
    const subSpy = spyOn(testBedClaimDetailsPopupService.getViewClaimDetailsByClaimNumber('192674429G'), 'subscribe');
    component.getClaimantDetails();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));



});
