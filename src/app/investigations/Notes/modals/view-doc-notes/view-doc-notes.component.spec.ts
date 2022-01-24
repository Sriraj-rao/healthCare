import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { EditNotesModel } from '../../models/edit-notes-model';
import { NotesService } from '../../services/notes.service';

import { ViewDocNotesComponent } from './view-doc-notes.component';

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

describe('ViewDocNotesComponent', () => {
  let component: ViewDocNotesComponent;
  let fixture: ComponentFixture<ViewDocNotesComponent>;
  let testBedNotesService: NotesService;
  let testBedDetailSharingService: DetailsSharingService;
  const mocknotes = mocknotesResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDocNotesComponent],
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
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocNotesComponent);
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
    component.UpdateNotes(param, 1);
    expect(component.UpdateNotes).toHaveBeenCalledWith(param, 1);
  });

  it('deleteNotes Method is called', () => {
    const param: any = null;
    spyOn(component, 'deleteNotes'); // spy first
    component.deleteNotes(param, 1);
    expect(component.deleteNotes).toHaveBeenCalledWith(param, 1);
  });

  it('update Method is called', () => {
    const param: EditNotesModel = null;
    spyOn(component, 'update'); // spy first
    component.update(param, 1);
    expect(component.update).toHaveBeenCalledWith(param, 1);
  });

  it('deleteNotes Method is called', () => {
    const param: any = null;
    spyOn(component, 'deleteNotes'); // spy first
    component.deleteNotes(param, 1);
    expect(component.deleteNotes).toHaveBeenCalledWith(param, 1);
  });
});
