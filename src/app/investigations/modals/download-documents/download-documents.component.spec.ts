import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';

import { DownloadDocumentsComponent } from './download-documents.component';

describe('DownloadDocumentsComponent', () => {
  let component: DownloadDocumentsComponent;
  let fixture: ComponentFixture<DownloadDocumentsComponent>;
  let testBedDetailSharingService: DetailsSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadDocumentsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(DownloadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
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

  it('should check onSubmit function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check onPreviewClose function calls onPreviewClose', () => {
    const insSummarySpy = spyOn<any>(component, 'onPreviewClose');
    component.onPreviewClose();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('onTemplateIdEmitted Method is called', () => {
    const param: any = null;
    spyOn(component, 'onTemplateIdEmitted'); // spy first
    component.onTemplateIdEmitted(param);
    expect(component.onTemplateIdEmitted).toHaveBeenCalledWith(param);
  });

  it('onPreviewDocument Method is called', () => {
    const param: any = null;
    spyOn(component, 'onPreviewDocument'); // spy first
    component.onPreviewDocument(param);
    expect(component.onPreviewDocument).toHaveBeenCalledWith(param);
  });

  it('onAllCheckbocClicked Method is called', () => {
    const param: any = null;
    spyOn(component, 'onAllCheckbocClicked'); // spy first
    component.onAllCheckbocClicked(param);
    expect(component.onAllCheckbocClicked).toHaveBeenCalledWith(param);
  });

  it('onCheckboxClicked Method is called', () => {
    const param: string = null;
    spyOn(component, 'onCheckboxClicked'); // spy first
    component.onCheckboxClicked(param);
    expect(component.onCheckboxClicked).toHaveBeenCalledWith(param);
  });
});
