import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { MSALInstanceFactory } from '../app.module';
import { DetailsSharingService } from '../core/services/details-sharing.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let testBedDetailSharingService: DetailsSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        MsalService,

        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the InvestigationService service', () => {
    expect(
      testBedDetailSharingService instanceof DetailsSharingService
    ).toBeTruthy();
  });

  it('should inject DetailsSharingService service using inject function and check its instance', inject(
    [DetailsSharingService],
    (testBedDetailSharingService: DetailsSharingService) => {
      expect(testBedDetailSharingService).toBeTruthy();
      expect(
        testBedDetailSharingService instanceof DetailsSharingService
      ).toBeTruthy();
    }
  ));
});
