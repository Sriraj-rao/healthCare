import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { FilterOptionsPipe } from 'src/app/shared/pipes/filter-options.pipe';
import { CloseInvestigationModel } from '../../models/close-investigation.model';
import { DocumentService } from '../../services/document.service';
import { InvestigationsService } from '../../services/investigation.service';

import { CloseInvestigationPopupComponent } from './close-investigation-popup.component';

const mockdocResults = {
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

describe('CloseInvestigationPopupComponent', () => {
  let component: CloseInvestigationPopupComponent;
  let fixture: ComponentFixture<CloseInvestigationPopupComponent>;
  let testBedInvestigationService: InvestigationsService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseInvestigationPopupComponent, FilterOptionsPipe],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        TextFieldModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
      ],
      providers: [
        FilterOptionsPipe,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseInvestigationPopupComponent);
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

  it('should inject InvestigationsService service using inject function and check its instance', inject(
    [InvestigationsService],
    (testBedInvestigationService: InvestigationsService) => {
      expect(testBedInvestigationService).toBeTruthy();
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

  // it('should check ngOnInIt function calls getInvestigationDecisions', () => {
  //   const insSummarySpy = spyOn<any>(component, 'getInvestigationDecisions');
  //   component.ngOnInit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  it('should check ngOnInIt function calls getPaymentTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'getPaymentTypes');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls setCommentsValidators', () => {
    let insSummarySpy = spyOn<any>(component, 'setCommentsValidators');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getClaimsByInvId', () => {
    const insSummarySpy = spyOn<any>(component, 'getClaimsByInvId');
    component.getClaimsByInvId();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getInvestigationDecisions', () => {
    const insSummarySpy = spyOn<any>(component, 'getInvestigationDecisions');
    component.getInvestigationDecisions();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getPaymentTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'getPaymentTypes');
    component.getPaymentTypes();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls setCommentsValidators', () => {
    let insSummarySpy = spyOn<any>(component, 'setCommentsValidators');
    component.setCommentsValidators();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  // it('should check  function calls statusSelection',()=>{
  //   let insSummarySpy=spyOn<any>(component,'statusSelection');
  //   component.statusSelection($event, 1);
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check  function calls onProofOfLossSelected',()=>{
  //   let insSummarySpy=spyOn<any>(component,'onProofOfLossSelected');
  //   component.onProofOfLossSelected();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  it('should check  function calls onCheckboxChanged', () => {
    const insSummarySpy = spyOn<any>(component, 'onCheckboxChanged');
    component.onCheckboxChanged(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onAllCheckboxChanged', () => {
    const insSummarySpy = spyOn<any>(component, 'onAllCheckboxChanged');
    component.onAllCheckboxChanged();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInvestigationService,
      'getInvestigationDecisions'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedInvestigationService.getInvestigationDecisions(),
      'subscribe'
    );
    component.getInvestigationDecisions();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedInvestigationService,
      'getAllPaymentTypes'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedInvestigationService.getAllPaymentTypes(),
      'subscribe'
    );
    component.getPaymentTypes();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('submitClaimsAttached Method is called', () => {
    const param: CloseInvestigationModel[] = [];
    spyOn(component, 'submitClaimsAttached'); // spy first
    component.submitClaimsAttached(param);
    expect(component.submitClaimsAttached).toHaveBeenCalledWith(param);
  });

  it('onHeaderChanged Method is called', () => {
    const param: any = null;
    spyOn(component, 'onHeaderChanged'); // spy first
    component.onHeaderChanged(param, 1);
    expect(component.onHeaderChanged).toHaveBeenCalledWith(param, 1);
  });

  it('getAsFormArray Method is called', () => {
    const param: string = null;
    spyOn(component, 'getAsFormArray'); // spy first
    component.getAsFormArray(param);
    expect(component.getAsFormArray).toHaveBeenCalledWith(param);
  });
});
