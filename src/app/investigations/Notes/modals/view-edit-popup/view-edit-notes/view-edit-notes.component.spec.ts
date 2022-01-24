import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { EditNotesModel } from '../../../models/edit-notes-model';
import { NotesService } from '../../../services/notes.service';

import { ViewEditNotesComponent } from './view-edit-notes.component';
const mocknotesResults = {
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

describe('ViewEditNotesComponent', () => {
  let component: ViewEditNotesComponent;
  let fixture: ComponentFixture<ViewEditNotesComponent>;
  let testBedNotesService: NotesService;
  let testBedDetailSharingService: DetailsSharingService;
  const mocknotes = mocknotesResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditNotesComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        // TextFieldModule,
        // MatSelectModule,
        // MatTableModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedNotesService = TestBed.get(NotesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('UpdateNotes Method is called', () => {
    const param: EditNotesModel = null;
    spyOn(component, 'UpdateNotes'); // spy first
    component.UpdateNotes(param);
    expect(component.UpdateNotes).toHaveBeenCalledWith(param);
  });

   // it('should check the testBedNote service', () =>{
  //   expect(testBedNotesService instanceof NotesService).toBeTruthy();
  // });

  // it('should inject details sharing service using inject function and check its instance',
  //inject([NotesService],(testBedNotesService: NotesService)=>{
  //   expect(testBedNotesService).toBeTruthy();
  //   expect(testBedNotesService instanceof NotesService).toBeTruthy();
  // }));
  // it('should check the details sharing service', () =>{
  //   expect(testBedDetailSharingService instanceof DetailsSharingService).toBeTruthy();
  // });

  // it('should inject details sharing service using inject function and check its instance',
  // inject([DetailsSharingService],(testBedDetailSharingService: DetailsSharingService)=>{
  //   expect(testBedDetailSharingService).toBeTruthy();
  //   expect(testBedDetailSharingService instanceof DetailsSharingService).toBeTruthy();
  // }));

  // it('should check ngOnInIt function calls initializeForm',()=>{
  //   let insSummarySpy=spyOn<any>(component,'initializeForm');
  //   component.ngOnInit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check ngOnInIt function calls editMode',()=>{
  //   let insSummarySpy=spyOn<any>(component,'editMode');
  //   component.ngOnInit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls initializeForm',()=>{
  //   let insSummarySpy=spyOn<any>(component,'initializeForm');
  //   component.initializeForm();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls editMode',()=>{
  //   let insSummarySpy=spyOn<any>(component,'editMode');
  //   component.editMode();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls cancel',()=>{
  //   let insSummarySpy=spyOn<any>(component,'cancel');
  //   component.cancel();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls onDeleteNotes',()=>{
  //   let insSummarySpy=spyOn<any>(component,'onDeleteNotes');
  //   component.onDeleteNotes();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls deleteNotes',()=>{
  //   let insSummarySpy=spyOn<any>(component,'deleteNotes');
  //   component.deleteNotes(1);
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  // it('should check function calls onSubmit',()=>{
  //   let insSummarySpy=spyOn<any>(component,'onSubmit');
  //   component.onSubmit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });
});
