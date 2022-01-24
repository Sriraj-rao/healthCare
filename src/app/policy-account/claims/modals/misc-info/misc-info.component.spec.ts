import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscInfoComponent } from './misc-info.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MiscInfoComponent', () => {
  let component: MiscInfoComponent;
  let fixture: ComponentFixture<MiscInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscInfoComponent],
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
    fixture = TestBed.createComponent(MiscInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
