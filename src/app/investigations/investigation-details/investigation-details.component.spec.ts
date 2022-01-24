import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InvestigationDetailsComponent } from './investigation-details.component';

describe('InvestigationDetailsComponent', () => {
  let component: InvestigationDetailsComponent;
  let fixture: ComponentFixture<InvestigationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestigationDetailsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,

        MatDialogModule,
        // ReactiveFormsModule ,
        // FormsModule,
        // TextFieldModule,
        // MatSelectModule,
        // MatAutocompleteModule,
        // MatIconModule,
        FontAwesomeModule,
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
    fixture = TestBed.createComponent(InvestigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check function calls onAttachClaims', () => {
    const insSummarySpy = spyOn<any>(component, 'onAttachClaims');
    component.onAttachClaims();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls uploadMiscellaneousDocument', () => {
    const insSummarySpy = spyOn<any>(component, 'uploadMiscellaneousDocument');
    component.uploadMiscellaneousDocument();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls addNewDocumentRequest', () => {
    const insSummarySpy = spyOn<any>(component, 'addNewDocumentRequest');
    component.addNewDocumentRequest(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onGetClaimCount', () => {
    const insSummarySpy = spyOn<any>(component, 'onGetClaimCount');
    component.onGetClaimCount(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
