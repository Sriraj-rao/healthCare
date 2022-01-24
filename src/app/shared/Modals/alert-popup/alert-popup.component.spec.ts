import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertPopupComponent } from './alert-popup.component';

describe('AlertPopupComponent', () => {
  let component: AlertPopupComponent;
  let fixture: ComponentFixture<AlertPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPopupComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,

      ],

      providers: [  { provide: MAT_DIALOG_DATA, useValue: {} },
        {   provide: MatDialogRef,
          useValue: {}
        },
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  function calls editRemainder', () => {
    const insSummarySpy = spyOn<any>(component, 'editRemainder');
    component.editRemainder();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onClose', () => {
    const insSummarySpy = spyOn<any>(component, 'onClose');
    component.onClose();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
