import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { FileViewerComponent } from './file-viewer.component';

describe('FileViewerComponent', () => {
  let component: FileViewerComponent;
  let fixture: ComponentFixture<FileViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileViewerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
