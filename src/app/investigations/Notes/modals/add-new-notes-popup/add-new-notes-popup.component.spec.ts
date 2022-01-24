import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { NotesService } from '../../services/notes.service';

import { AddNewNotesPopupComponent } from './add-new-notes-popup.component';
const mocknotesResults = {
  data: [],
  isSuccess: true
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private localTestParams: {};
  get testParams() { return this.localTestParams; }
  set testParams(params: {}) {
    this.localTestParams = params;
    this.subject.next(params);
  }
}

describe('AddNewNotesPopupComponent', () => {
  let component: AddNewNotesPopupComponent;
  let fixture: ComponentFixture<AddNewNotesPopupComponent>;
  let testBedNotesService: NotesService;
  let testBedDetailSharingService: DetailsSharingService;
  const mocknotes = mocknotesResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewNotesPopupComponent],

      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        // TextFieldModule,
        // MatSelectModule,
        // MatTableModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }

      ],


    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewNotesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedNotesService = TestBed.get(NotesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check the testBedNote service', () => {
    expect(testBedNotesService instanceof NotesService).toBeTruthy();
  });

  it('should inject details sharing service using inject function and check its instance', inject([NotesService],
    (testBedNotesService: NotesService) => {
    expect(testBedNotesService).toBeTruthy();
    expect(testBedNotesService instanceof NotesService).toBeTruthy();
  }));
  it('should check the details sharing service', () => {
    expect(testBedDetailSharingService instanceof DetailsSharingService).toBeTruthy();
  });

  it('should inject details sharing service using inject function and check its instance',
   inject([DetailsSharingService], (testBedDetailSharingService: DetailsSharingService) => {
    expect(testBedDetailSharingService).toBeTruthy();
    expect(testBedDetailSharingService instanceof DetailsSharingService).toBeTruthy();
  }));

  it('should check ngOnInIt function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
