import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SharedModule } from '../../shared.module';
import { AddInvestigationService } from '../services/add-investigation.service';

import { AddInvestigationPopupComponent } from './add-investigation-popup.component';

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

describe('AddInvestigationPopupComponent', () => {
  let component: AddInvestigationPopupComponent;
  let fixture: ComponentFixture<AddInvestigationPopupComponent>;
  let testBedAddInvestigationService: AddInvestigationService;
  const mockResults = mockinvResults;
  let mockParams, mockActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInvestigationPopupComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatDialogModule,
        MatSelectModule,
      ],
      providers: [
        AddInvestigationService,
        LoadingService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    mockActivatedRoute = new ActivatedRouteStub();
    fixture = TestBed.createComponent(AddInvestigationPopupComponent);
    component = fixture.componentInstance;
    // mockActivatedRoute.testParams = {ctrlno: '3'};
    fixture.detectChanges();
    testBedAddInvestigationService = TestBed.get(AddInvestigationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the investigation category service', () => {
    expect(
      testBedAddInvestigationService instanceof AddInvestigationService
    ).toBeTruthy();
  });

  // it('should inject investigatin service using inject function and check its instance', 
  // inject([AddInvestigationService],(AddInvestigationService: AddInvestigationService)=>{
  //   expect(AddInvestigationService).toBeTruthy();
  //   expect(AddInvestigationService instanceof AddInvestigationService).toBeTruthy();
  // }));

  // it('testing subscribe method is getting called', fakeAsync(()=>{
  //   let getInsuredSpy= spyOn(testBedAddInvestigationService,'getInvestigationCategories').
  // and.returnValue(of(mockResults));
  //   let subSpy= spyOn(testBedAddInvestigationService.getInvestigationCategories(), 'subscribe');
  //   component['getInvestigationCategoryDetails']();
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
  //   expect(subSpy).toHaveBeenCalled();
  // }));

  // it('testing subscribe method is getting called', fakeAsync(()=>{
  //   let getInsuredSpy= spyOn(testBedAddInvestigationService,'getInvestigationSubCategories')
  // .and.returnValue(of(mockResults));
  //   let subSpy= spyOn(testBedAddInvestigationService.getInvestigationSubCategories(1), 'subscribe');
  //   component['getInvestigationSubCategoryDetails']();
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
  //   expect(subSpy).toHaveBeenCalled();
  // }));
});
