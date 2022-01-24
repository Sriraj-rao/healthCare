import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DocumentUploaderComponent } from './document-uploader.component';

describe('DocumentUploaderComponent', () => {
  let component: DocumentUploaderComponent;
  let fixture: ComponentFixture<DocumentUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUploaderComponent ],
      imports: [ HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
      MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
