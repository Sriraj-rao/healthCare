import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';

import { ViewClaimsDetailsPopupComponent } from './view-claims-details-popup.component';

const mockviewinvResults = {
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

describe('ViewClaimsDetailsPopupComponent', () => {
  let component: ViewClaimsDetailsPopupComponent;
  let fixture: ComponentFixture<ViewClaimsDetailsPopupComponent>;
  let testBedViewInvestigationService: ClaimsService;
  const mockResults = mockviewinvResults;
  let mockActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClaimsDetailsPopupComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        MatSnackBarModule,
      ],
      providers: [
        ClaimsService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClaimsDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedViewInvestigationService = TestBed.get(ClaimsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the investigation category service', () => {
    expect(
      testBedViewInvestigationService instanceof ClaimsService
    ).toBeTruthy();
  });

  it('should inject testBedViewInvestigationService service using inject function and check its instance', inject(
    [ClaimsService],
    (testBedViewInvestigationService: ClaimsService) => {
      expect(ClaimsService).toBeTruthy();
      expect(
        testBedViewInvestigationService instanceof ClaimsService
      ).toBeTruthy();
    }
  ));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedViewInvestigationService,
      'getViewClaimsByClaimNumber'
    ).and.returnValue(of(mockResults));
    const subSpy = spyOn(
      testBedViewInvestigationService.getViewClaimsByClaimNumber('192674429G'),
      'subscribe'
    );
    component.getClaimsDetails();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));
});
