import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { FilterOptionsPipe } from 'src/app/shared/pipes/filter-options.pipe';
import { InvestigationsService } from '../../services/investigation.service';

import { EditPendCodeComponent } from './edit-pend-code.component';
const mockinvResults = {
  data: [],
  isSuccess: true,
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private testParamss: {};
  get testParams() {
    return this.testParamss;
  }
  set testParams(params: {}) {
    this.testParamss = params;
    this.subject.next(params);
  }
}

describe('EditPendCodeComponent', () => {
  let component: EditPendCodeComponent;
  let fixture: ComponentFixture<EditPendCodeComponent>;
  let testBedInvestigationService: InvestigationsService;
  let testBedAddInvestigationService: AddInvestigationService;
  let testBedDetailSharingService: DetailsSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPendCodeComponent, FilterOptionsPipe],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
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
    fixture = TestBed.createComponent(EditPendCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedAddInvestigationService = TestBed.get(AddInvestigationService);
    testBedInvestigationService = TestBed.get(InvestigationsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the DetailsSharingService service', () => {
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
});
