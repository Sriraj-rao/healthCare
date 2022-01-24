import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { FilterOptionsPipe } from 'src/app/shared/pipes/filter-options.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReopenClaim } from '../../models/reopen.model';

import { ReopenPopupComponent } from './reopen-popup.component';

const mockinvResults = {
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

describe('ReopenPopupComponent', () => {
  let component: ReopenPopupComponent;
  let fixture: ComponentFixture<ReopenPopupComponent>;
  let testBedAddInvestigationService: AddInvestigationService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockinv = mockinvResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReopenPopupComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        // SharedModule
        // FilterOptionsPipe
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        LoadingService,
        FilterOptionsPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedAddInvestigationService = TestBed.get(AddInvestigationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the InvestigationService service', () => {
    expect(
      testBedDetailSharingService instanceof DetailsSharingService
    ).toBeTruthy();
  });

  it('should inject DetailsSharingService service using inject function and check its instance', inject(
    [DetailsSharingService],
    (testBedDetailSharingService: DetailsSharingService) => {
      expect(testBedDetailSharingService).toBeTruthy();
      expect(
        testBedDetailSharingService instanceof DetailsSharingService
      ).toBeTruthy();
    }
  ));

  it('should check the testBedAddInvestigationService service', () => {
    expect(
      testBedAddInvestigationService instanceof AddInvestigationService
    ).toBeTruthy();
  });

  it('should inject testBedAddInvestigationService service using inject function and check its instance', inject(
    [AddInvestigationService],
    (testBedAddInvestigationService: AddInvestigationService) => {
      expect(testBedAddInvestigationService).toBeTruthy();
      expect(
        testBedAddInvestigationService instanceof AddInvestigationService
      ).toBeTruthy();
    }
  ));

  it('should check ngOnInIt function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls getPendCodes', () => {
    const insSummarySpy = spyOn<any>(component, 'getPendCodes');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check getPendCodes function calls getPendCodes', () => {
    const insSummarySpy = spyOn<any>(component, 'getPendCodes');
    component.getPendCodes();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check initializeForm function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check onCloseDialog function calls onCloseDialog', () => {
    const insSummarySpy = spyOn<any>(component, 'onCloseDialog');
    component.onCloseDialog();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check onSelectClicked function calls onSelectClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onSelectClicked');
    component.onSelectClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check onClearSearch function calls onClearSearch', () => {
    const insSummarySpy = spyOn<any>(component, 'onClearSearch');
    component.onClearSearch();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check onSubmit function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('statusSelection Method is called', () => {
    const param: any = null;
    spyOn(component, 'statusSelection'); // spy first
    component.statusSelection(param);
    expect(component.statusSelection).toHaveBeenCalledWith(param);
  });

  it('reopenRequest Method is called', () => {
    const param: ReopenClaim = null;
    spyOn(component, 'reopenRequest'); // spy first
    component.reopenRequest(param);
    expect(component.reopenRequest).toHaveBeenCalledWith(param);
  });
});
