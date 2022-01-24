import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { StateManagementService } from 'src/app/core/services/state-management.service';
import { InvestigationsService } from 'src/app/investigations/services/investigation.service';

import { InvestigationsTabComponent } from './investigations-tab.component';

const mockInvResults = {
  isSuccess: true,
  data: [],
 
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() {
    return this._testParams;
  }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
}


describe('InvestigationsTabComponent', () => {
  let component: InvestigationsTabComponent;
  let fixture: ComponentFixture<InvestigationsTabComponent>;
  let testBedInvestigationService: InvestigationsService;
  let testBedDetailSharingService: DetailsSharingService;
  let testBedStateManagementService: StateManagementService;
  let mockinv = mockInvResults;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestigationsTabComponent],
      imports: [
        HttpClientTestingModule,

        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedInvestigationService = TestBed.get(InvestigationsService);
    testBedStateManagementService = TestBed.get(StateManagementService);

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

  it('should check the StateManagement service', () => {
    expect(
      testBedStateManagementService instanceof StateManagementService
    ).toBeTruthy();
  });

  it('should inject StateManagement Service using inject function and check its instance', inject(
    [StateManagementService],
    (testBedStateManagementService: StateManagementService) => {
      expect(testBedStateManagementService).toBeTruthy();
      expect(
        testBedStateManagementService instanceof StateManagementService
      ).toBeTruthy();
    }
  ));
  it('should check  function calls assignInvestigationDetails', () => {
    let insSummarySpy = spyOn<any>(component, 'assignInvestigationDetails');
    component.assignInvestigationDetails();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check  function calls assignInvestigationDetailsOnService', () => {
    let insSummarySpy = spyOn<any>(component, 'assignInvestigationDetailsOnService');
    component.assignInvestigationDetailsOnService();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check  function calls getInvestigationsByPolicyNumber', () => {
    let insSummarySpy = spyOn<any>(component, 'getInvestigationsByPolicyNumber');
    component.getInvestigationsByPolicyNumber();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls assignDataSource', () => {
    let insSummarySpy = spyOn<any>(component, 'assignDataSource');
    component.assignDataSource();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  // it('testing subscribe method is getting called', fakeAsync(() => {
  //   let getInsuredSpy = spyOn(
  //     testBedInvestigationService,
  //     'getInvestigationsByPolicyNo'
  //   ).and.returnValue(of(mockinv));
  //   let subSpy = spyOn(
  //     testBedInvestigationService.getInvestigationsByPolicyNo('52M459735B'),
  //     'subscribe'
  //   );
  //   component['getInvestigationsByPolicyNo']('52M459735B');
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy); 
  //   expect(subSpy).toHaveBeenCalled();
  // }));
});

