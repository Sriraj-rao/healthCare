import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, DefaultValueAccessor, ControlValueAccessor } from '@angular/forms';

import { InvestigationFormComponent } from './investigation-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

describe('InvestigationFormComponent', () => {
  let component: InvestigationFormComponent;
  let fixture: ComponentFixture<InvestigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestigationFormComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule ,
        FormsModule,
        TextFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,


        // MatTableModule
      ],
    //   providers: [
    //     {
    //       provide: MatDialogRef,
    //       useValue: {}
    //     },
    //     { provide: MAT_DIALOG_DATA, useValue: {} },
    //  ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onClear', () => {
    const insSummarySpy = spyOn<any>(component, 'onClear');
    component.onClear();
    expect(insSummarySpy).toHaveBeenCalled();
  });


});
