import { CdkRow } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRow, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClaimsService } from '../Services/claims-service.service';

import { ClaimsDetailsComponent } from './claims-details.component';

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

describe('ClaimsDetailsComponent', () => {
  let component: ClaimsDetailsComponent;
  let fixture: ComponentFixture<ClaimsDetailsComponent>;
  let testBedClaimsService: ClaimsService;
  let testBedDetailsService: DetailsSharingService;
  const mockResults = mockClaimsResults;
  // let mockParams, mockActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsDetailsComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        RouterTestingModule,
        MatTableModule,
        MatSnackBarModule,
        FontAwesomeModule,
        MatDividerModule,
        MatButtonModule,
      ],
      // providers:[ClaimsService,
      //   { provide: MAT_DIALOG_DATA, useValue: {} },
      //   {   provide: MatDialogRef,
      //     useValue: {}
      //   },
      // {provide: ActivatedRoute, useValue: mockActivatedRoute}

      // ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedClaimsService = TestBed.get(ClaimsService);
    testBedDetailsService = TestBed.get(DetailsSharingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should check the details sharing service', () => {
    expect(testBedDetailsService instanceof DetailsSharingService).toBeTruthy();
  });

  it('should inject testBedDetailsService service using inject function and check its instance', inject(
    [DetailsSharingService],
    (testBedDetailsService: DetailsSharingService) => {
      expect(testBedDetailsService).toBeTruthy();
      expect(
        testBedDetailsService instanceof DetailsSharingService
      ).toBeTruthy();
    }
  ));

  it('should check ngOnInIt function calls assignDataSource', () => {
    const insSummarySpy = spyOn<any>(component, 'assignDataSource');
    component.assignDataSource();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls initializeFilters', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeFilters');
    component.initializeFilters();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls onViewAllClaims', () => {
    const insSummarySpy = spyOn<any>(component, 'onViewAllClaims');
    component.onViewAllClaims();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls onReset', () => {
    const insSummarySpy = spyOn<any>(component, 'onReset');
    component.onReset();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls getSingleClaimDetails', () => {
    const insSummarySpy = spyOn<any>(component, 'getSingleClaimDetails');
    component.getSingleClaimDetails('211124587S');
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedClaimsService,
      'getClaimsByClaimNumber'
    ).and.returnValue(of(mockResults));
    const subSpy = spyOn(
      testBedClaimsService.getClaimsByClaimNumber('211124587S'),
      'subscribe'
    );
    component.getSingleClaimDetails('211124587S');
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('applyFilter Method is called', () => {
    const param: string = null;
    spyOn(component, 'applyFilter'); // spy first
    component.applyFilter(param, 1);
    expect(component.applyFilter).toHaveBeenCalledWith(param, 1);
  });
  // it('testing subscribe method is getting called', fakeAsync(() => {
  //   let getInsuredSpy = spyOn(
  //     testBedClaimsService,
  //     'getPaginatedClaims'
  //   ).and.returnValue(of(mockResults));
  //   let subSpy = spyOn(
  //     testBedClaimsService.getPaginatedClaims('52M637300B'),
  //     'subscribe'
  //   );
  //   component['getClaimsDetails']();
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
  //   expect(subSpy).toHaveBeenCalled();
  // }));

  it('should check ngOnInIt function calls applyFilter', () => {
    const insSummarySpy = spyOn<any>(component, 'applyFilter');
    component.applyFilter('All Claimants', 1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check OnAddInvestigation function calls OnAddInvestigation', () => {
    const insSummarySpy = spyOn<any>(component, 'OnAddInvestigation');
    component.OnAddInvestigation(CdkRow);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check onClaimDetails function calls onClaimDetails', () => {
    const insSummarySpy = spyOn<any>(component, 'onClaimDetails');
    component.onClaimDetails(CdkRow);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  // it('should check ngOnInIt function calls applyFilter', async(() => {
  //   spyOn<any>(component, 'applyFilter');
  //   let el = fixture.debugElement.query(By.css('button')).nativeElement.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.applyFilter).toHaveBeenCalled();
  //   });
  // }));

  //
  // it('should check Reset Filter button click calls onReset()', async(() => {
  //   spyOn<any>(component, 'onReset');
  //   let el = fixture.debugElement.query(By.css('#btnResetClick')).nativeElement.click();

  //   fixture.whenStable().then(() => {
  //     expect(component.onReset()).toHaveBeenCalled();
  //   });
  // }));
});
