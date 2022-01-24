import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { AttachedClaimsDetails } from 'src/app/shared/models/attached-claims-details.model';
import { InvestigationsService } from '../services/investigation.service';

import { ClaimsAttachedComponent } from './claims-attached.component';

const mockClaimResults = {
  data: [],
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

describe('ClaimsAttachedComponent', () => {
  let component: ClaimsAttachedComponent;
  let fixture: ComponentFixture<ClaimsAttachedComponent>;
  let testBedInvestigationService: InvestigationsService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockClaim = mockClaimResults;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsAttachedComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsAttachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedInvestigationService = TestBed.get(InvestigationsService);
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

  it('should check ngOnInIt function calls getAttachedClaims', () => {
    const insSummarySpy = spyOn<any>(component, 'getAttachedClaims');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInvestigationService,
      'getClaimsAttached'
    ).and.returnValue(of(mockClaim));
    const subSpy = spyOn(
      testBedInvestigationService.getClaimsAttached(1, false),
      'subscribe'
    );
    component.getAttachedClaims();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('onReopenInvestigation Method is called', () => {
    const param: any = null;
    spyOn(component, 'onReopenInvestigation'); // spy first
    component.onReopenInvestigation(param);
    expect(component.onReopenInvestigation).toHaveBeenCalledWith(param);
  });

  it('onAllRowsClicked Method is called', () => {
    const param: boolean = null;
    spyOn(component, 'onAllRowsClicked'); // spy first
    component.onAllRowsClicked(param);
    expect(component.onAllRowsClicked).toHaveBeenCalledWith(param);
  });

  it('setAttachedClaims Method is called', () => {
    const param: AttachedClaimsDetails = null;
    spyOn(component, 'setAttachedClaims'); // spy first
    component.setAttachedClaims(param);
    expect(component.setAttachedClaims).toHaveBeenCalledWith(param);
  });

  it('onEditPendCode Method is called', () => {
    const param: Claim = null;
    spyOn(component, 'onEditPendCode'); // spy first
    component.onEditPendCode(param);
    expect(component.onEditPendCode).toHaveBeenCalledWith(param);
  });
});
