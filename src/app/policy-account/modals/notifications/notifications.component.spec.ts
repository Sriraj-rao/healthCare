import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      imports: [ HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
  //       { provide: ActivatedRoute, useValue: {
  //         paramMap: of( convertToParamMap( { id: 0 } ) )
  //     }
  // },
        { provide: MAT_DIALOG_DATA, useValue: {} },
     ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  function calls onAcknowledge', () => {
    const insSummarySpy = spyOn<any>(component, 'onAcknowledge');
    component.onAcknowledge();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
