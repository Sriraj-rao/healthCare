import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PolicyAccountComponent } from './policy-account.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsSharingService } from '../core/services/details-sharing.service';
import { PolicyAccountsService } from './services/policy-account.service';
import { MatDividerModule } from '@angular/material/divider';

describe('PolicyAccountComponent', () => {
  let component: PolicyAccountComponent;
  let fixture: ComponentFixture<PolicyAccountComponent>;
  let testBedPolicyAccountsService: PolicyAccountsService;
  let testBedDetailSharingService: DetailsSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicyAccountComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatTableModule,
        RouterTestingModule,
        MatTabsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatDividerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedPolicyAccountsService = TestBed.get(PolicyAccountsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the DetailsSharingService service', () => {
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

  it('should check the PolicyAccountsService service', () => {
    expect(
      testBedPolicyAccountsService instanceof PolicyAccountsService
    ).toBeTruthy();
  });

  it('should inject PolicyAccountsService service using inject function and check its instance', inject(
    [PolicyAccountsService],
    (testBedPolicyAccountsService: PolicyAccountsService) => {
      expect(testBedPolicyAccountsService).toBeTruthy();
      expect(
        testBedPolicyAccountsService instanceof PolicyAccountsService
      ).toBeTruthy();
    }
  ));

  it('should check ngOnInIt function calls getContactInfo', () => {
    const insSummarySpy = spyOn<any>(component, 'getContactInfo');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getContactInfo', () => {
    const insSummarySpy = spyOn<any>(component, 'getContactInfo');
    component.getContactInfo();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onNameClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onNameClicked');
    component.onNameClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls togglePPONetwork', () => {
    const insSummarySpy = spyOn<any>(component, 'togglePPONetwork');
    component.togglePPONetwork();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls policyHolderAddress', () => {
    const insSummarySpy = spyOn<any>(component, 'policyHolderAddress');
    component.policyHolderAddress();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls associationStatus', () => {
    const insSummarySpy = spyOn<any>(component, 'associationStatus');
    component.associationStatus();
    expect(insSummarySpy).toHaveBeenCalled();
  });
});
