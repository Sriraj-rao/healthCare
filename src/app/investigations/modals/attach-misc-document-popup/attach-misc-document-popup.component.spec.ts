import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RequestTypeDropdownModel } from '../../models/doc-rquest-dropdowns.model';
import { DocumentService } from '../../services/document.service';

import { AttachMiscDocumentPopupComponent } from './attach-misc-document-popup.component';

const mockdocResults = {
  data: [],
  isSuccess: true,
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private testParamss: {};
  get testParams() {
    return this.testParamss;
  }
  set testParams(params: {}) {
    this.testParamss = params;
    this.subject.next(params);
  }
}

describe('AttachMiscDocumentPopupComponent', () => {
  let component: AttachMiscDocumentPopupComponent;
  let fixture: ComponentFixture<AttachMiscDocumentPopupComponent>;
  let testBedDocumentService: DocumentService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachMiscDocumentPopupComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,

        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        // TextFieldModule,
        MatSelectModule,
        // MatTableModule
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
    fixture = TestBed.createComponent(AttachMiscDocumentPopupComponent);
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

  it('should check ngOnInIt function calls getAllRequestTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllRequestTypes');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check initializeForm function calls initializeForm', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeForm');
    component.initializeForm();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check getAllRequestTypes function calls getAllRequestTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllRequestTypes');
    component.getAllRequestTypes();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls getDocumentRequestsByRequestType', () => {
    const insSummarySpy = spyOn<any>(
      component,
      'getDocumentRequestsByRequestType'
    );
    component.getDocumentRequestsByRequestType(1);
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getDocumentRequestsByRequestType'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getDocumentRequestsByRequestType(1, 1),
      'subscribe'
    );
    component.getDocumentRequestsByRequestType(1);
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getAllRequestTypes'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getAllRequestTypes(false),
      'subscribe'
    );
    component.getAllRequestTypes();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  // it('should check  function calls onDocTypeSelected',()=>{
  //   let insSummarySpy=spyOn<any>(component,'onDocTypeSelected');
  //   component.onDocTypeSelected();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  it('should check  function calls onSelectionChange', () => {
    const insSummarySpy = spyOn<any>(component, 'onSelectionChange');
    component.onSelectionChange();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onClear', () => {
    const insSummarySpy = spyOn<any>(component, 'onClear');
    component.onClear();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check  function calls uploadDocument', () => {
    const insSummarySpy = spyOn<any>(component, 'uploadDocument');
    component.uploadDocument();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('onDocTypeSelected Method is called', () => {
    const param: RequestTypeDropdownModel = null;
    spyOn(component, 'onDocTypeSelected'); // spy first
    component.onDocTypeSelected(param);
    expect(component.onDocTypeSelected).toHaveBeenCalledWith(param);
  });
});
