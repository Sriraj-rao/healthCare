import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { NotesModule } from '../notes.module';
import { NotesService } from '../services/notes.service';

import { NotesComponent } from './notes.component';

const mockNotesResults = {
  data: [],
  isSuccess: true
};

@Injectable()
export class ActivatedRouteStub
{
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    private localTestParams: {};
    get testParams() { return this.localTestParams; }
    set testParams(params: {}) {
        this.localTestParams = params;
        this.subject.next(params);
    }
}

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let testBedNotesService: NotesService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockNotes = mockNotesResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        NotesModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedNotesService = TestBed.get(NotesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
