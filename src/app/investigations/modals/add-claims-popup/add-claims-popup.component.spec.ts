import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { ClaimsService } from 'src/app/policy-account/claims/Services/claims-service.service';
// import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { SearchService } from 'src/app/shared/search/services/search.service';

import { AddClaimsPopupComponent } from './add-claims-popup.component';
import { FilterOptionsPipe } from 'src/app/shared/pipes/filter-options.pipe';

const mockdocResults = {
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

describe('AddClaimsPopupComponent', () => {
  let component: AddClaimsPopupComponent;
  let fixture: ComponentFixture<AddClaimsPopupComponent>;
  let testBedCoreService: CoreService;
  // let testBedbreadCrumbService: BreadcrumbService;
  let testBedSearchService: SearchService;
  let testBedDetailSharingService: DetailsSharingService;
  let testBedClaimsService: ClaimsService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClaimsPopupComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,

        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        TextFieldModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatIconModule,
        FontAwesomeModule,
        // MatTableModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FilterOptionsPipe

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClaimsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedCoreService = TestBed.get(CoreService);
    // testBedbreadCrumbService=TestBed.get(BreadcrumbService);
    testBedSearchService = TestBed.get(SearchService);
    testBedClaimsService = TestBed.get(ClaimsService);
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

  it('should check the testBedCoreService service', () => {
    expect(testBedCoreService instanceof CoreService).toBeTruthy();
  });

  it('should inject testBedCoreService service using inject function and check its instance', inject(
    [CoreService],
    (testBedCoreService: CoreService) => {
      expect(testBedCoreService).toBeTruthy();
      expect(testBedCoreService instanceof CoreService).toBeTruthy();
    }
  ));

  // it('should check the testBedbreadCrumbService service', () =>{
  //   expect(testBedbreadCrumbService instanceof BreadcrumbService).toBeTruthy();
  // });

  // it('should inject testBedbreadCrumbService service using inject function 
  // and check its instance', inject([BreadcrumbService],(testBedbreadCrumbService:
  //  BreadcrumbService)=>{
  //   expect(testBedbreadCrumbService).toBeTruthy();
  //   expect(testBedbreadCrumbService instanceof BreadcrumbService).toBeTruthy();
  // }));

  it('should check the testBedSearchService service', () => {
    expect(testBedSearchService instanceof SearchService).toBeTruthy();
  });

  it('should inject testBedSearchService service using inject function and check its instance', inject(
    [SearchService],
    (testBedSearchService: SearchService) => {
      expect(testBedSearchService).toBeTruthy();
      expect(testBedSearchService instanceof SearchService).toBeTruthy();
    }
  ));

  it('should check the testBedClaimsService service', () => {
    expect(testBedClaimsService instanceof ClaimsService).toBeTruthy();
  });

  it('should inject testBedClaimsService service using inject function and check its instance', inject(
    [ClaimsService],
    (testBedClaimsService: ClaimsService) => {
      expect(testBedClaimsService).toBeTruthy();
      expect(testBedClaimsService instanceof ClaimsService).toBeTruthy();
    }
  ));

  it('should check function calls onSearch', () => {
    const insSummarySpy = spyOn<any>(component, 'onSearch');
    component.onSearch();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls searchByNameOrPolicy', () => {
    const insSummarySpy = spyOn<any>(component, 'searchByNameOrPolicy');
    component.searchByNameOrPolicy();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls searchByMemberId', () => {
    const insSummarySpy = spyOn<any>(component, 'searchByMemberId');
    component.searchByMemberId();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls searchByClaimNo', () => {
    const insSummarySpy = spyOn<any>(component, 'searchByClaimNo');
    component.searchByClaimNo();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onOptionClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onOptionClicked');
    component.onOptionClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getClaimsDetails', () => {
    const insSummarySpy = spyOn<any>(component, 'getClaimsDetails');
    component.getClaimsDetails('52M641360B');
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getSingleClaimDetails', () => {
    const insSummarySpy = spyOn<any>(component, 'getSingleClaimDetails');
    component.getSingleClaimDetails('201690260M');
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls initializeDataSource', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeDataSource');
    component.initializeDataSource();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
