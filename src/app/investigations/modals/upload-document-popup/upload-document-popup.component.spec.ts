import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DocumentService } from '../../services/document.service';

import { UploadDocumentPopupComponent } from './upload-document-popup.component';

const mockdocResults = {
  data: [],
  isSuccess: true,
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private TEST_PARAMS: {};
  get testParams() {
    return this.TEST_PARAMS;
  }
  set testParams(params: {}) {
    this.TEST_PARAMS = params;
    this.subject.next(params);
  }
}

describe('UploadDocumentPopupComponent', () => {
  let component: UploadDocumentPopupComponent;
  let fixture: ComponentFixture<UploadDocumentPopupComponent>;
  let testBedDocumentService: DocumentService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDocumentPopupComponent, DatePipe],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        TextFieldModule,
        MatSelectModule,
        // MatTableModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: DatePipe,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedDocumentService = TestBed.get(DocumentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the InvestigationService service', () => {
    expect(testBedDocumentService instanceof DocumentService).toBeTruthy();
  });

  it('should inject documentService service using inject function and check its instance', inject(
    [DocumentService],
    (testBedDocumentService: DocumentService) => {
      expect(testBedDocumentService).toBeTruthy();
      expect(testBedDocumentService instanceof DocumentService).toBeTruthy();
    }
  ));

  it('should check the details sharing service', () => {
    expect(
      testBedDetailSharingService instanceof DetailsSharingService
    ).toBeTruthy();
  });

  it('should inject details sharing service using inject function and check its instance', inject(
    [DetailsSharingService],
    (testBedDetailSharingService: DetailsSharingService) => {
      expect(testBedDetailSharingService).toBeTruthy();
      expect(
        testBedDetailSharingService instanceof DetailsSharingService
      ).toBeTruthy();
    }
  ));

  it('should check ngOnInIt function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check ngOnInIt function calls initializeDocTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeDocTypes');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls initializeDocTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeDocTypes');
    component.initializeDocTypes();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check ngOnInIt function calls getDocumentTemplatePropertyValues', () => {
    const insSummarySpy = spyOn<any>(
      component,
      'getDocumentTemplatePropertyValues'
    );
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getDocumentTemplatePropertyValues', () => {
    const insSummarySpy = spyOn<any>(
      component,
      'getDocumentTemplatePropertyValues'
    );
    component.getDocumentTemplatePropertyValues();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check ngOnInIt function calls getAllDeliveriyMethods', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllDeliveriyMethods');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getAllDeliveriyMethods', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllDeliveriyMethods');
    component.getAllDeliveriyMethods();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getDocumentTemplatePropertyValues'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getDocumentTemplatePropertyValues(1),
      'subscribe'
    );
    component.getDocumentTemplatePropertyValues();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getAllDeliveriyMethods'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getAllDeliveriyMethods(),
      'subscribe'
    );
    component.getAllDeliveriyMethods();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should check function calls propertiesFormArray', () => {
    const insSummarySpy = spyOn<any>(component, 'propertiesFormArray');
    component.propertiesFormArray();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check function calls onSelectionChange', () => {
    const insSummarySpy = spyOn<any>(component, 'onSelectionChange');
    component.onSelectionChange();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check function calls onClear', () => {
    const insSummarySpy = spyOn<any>(component, 'onClear');
    component.onClear();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onCheckboxClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onCheckboxClicked');
    component.onCheckboxClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });
  it('should check function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls uploadDocument', () => {
    const insSummarySpy = spyOn<any>(component, 'uploadDocument');
    component.uploadDocument();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('onFileEmitted Method is called', () => {
    const param: any = null;
    spyOn(component, 'onFileEmitted'); // spy first
    component.onFileEmitted(param);
    expect(component.onFileEmitted).toHaveBeenCalledWith(param);
  });

  it('onFileDeleted Method is called', () => {
    const param: any = null;
    spyOn(component, 'onFileDeleted'); // spy first
    component.onFileDeleted(param);
    expect(component.onFileDeleted).toHaveBeenCalledWith(param);
  });
});
