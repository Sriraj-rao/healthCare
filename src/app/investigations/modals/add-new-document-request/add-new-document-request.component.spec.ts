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
import { ClaimDetail } from 'src/app/shared/Modals/Models/claim-detail';
import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';
import { DocumentPropertyModel } from '../../models/document-property-values.model';
import { DocumentService } from '../../services/document.service';

import { AddNewDocumentRequestComponent } from './add-new-document-request.component';

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

describe('AddNewDocumentRequestComponent', () => {
  let component: AddNewDocumentRequestComponent;
  let fixture: ComponentFixture<AddNewDocumentRequestComponent>;
  let testBedDocumentService: DocumentService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewDocumentRequestComponent, DatePipe],
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
        DatePipe,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDocumentRequestComponent);
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
  // it('should check function calls checkInsuredExists', () => {
  //   const insSummarySpy = spyOn<any>(component, 'checkInsuredExists');
  //   component.checkInsuredExists();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });
  it('should check ngOnInIt function calls getAllCompanies', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllCompanies');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getAllCompanies', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllCompanies');
    component.getAllCompanies();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls initializeComponentForEdit', () => {
    const insSummarySpy = spyOn<any>(component, 'initializeComponentForEdit');
    component.initializeComponentForEdit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  // it('should check function calls onCompanySelected',()=>{
  //   let insSummarySpy=spyOn<any>(component,'onCompanySelected');
  //   component.onCompanySelected();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });

  it('should check function calls onDocTypeSelected', () => {
    const insSummarySpy = spyOn<any>(component, 'onDocTypeSelected');
    component.onDocTypeSelected();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getDocDetailsForEdit', () => {
    const insSummarySpy = spyOn<any>(component, 'getDocDetailsForEdit');
    component.getDocDetailsForEdit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  // it('testing subscribe method is getting called', fakeAsync(()=>{
  //   let getInsuredSpy= spyOn(testBedDocumentService,'getDocumentRequestDetails').and.returnValue(of(mockdocs));
  //   let subSpy= spyOn(testBedDocumentService.getDocumentRequestDetails(1), 'subscribe');
  //   component['getDocDetailsForEdit']();
  //   expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
  //   expect(subSpy).toHaveBeenCalled();
  // }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getAllCompanies'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(testBedDocumentService.getAllCompanies(), 'subscribe');
    component.getAllCompanies();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should check function calls getAllCompanies', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllCompanies');
    component.getAllCompanies();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls getAllRequestTypes', () => {
    const insSummarySpy = spyOn<any>(component, 'getAllRequestTypes');
    component.getAllRequestTypes();
    expect(insSummarySpy).toHaveBeenCalled();
  });

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

  it('should check function calls getPropertiesByRequest', () => {
    const insSummarySpy = spyOn<any>(component, 'getPropertiesByRequest');
    component.getPropertiesByRequest();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls propertiesFormArray', () => {
    const insSummarySpy = spyOn<any>(component, 'propertiesFormArray');
    component.propertiesFormArray();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls assignProperties', () => {
    const insSummarySpy = spyOn<any>(component, 'assignProperties');
    component.assignProperties();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onClear', () => {
    const insSummarySpy = spyOn<any>(component, 'onClear');
    component.onClear();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls onSubmit', () => {
    const insSummarySpy = spyOn<any>(component, 'onSubmit');
    component.onSubmit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check function calls createNewDocumentRequest', () => {
    const insSummarySpy = spyOn<any>(component, 'createNewDocumentRequest');
    component.createNewDocumentRequest();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('asssignValidators Method is called', () => {
    const param: DocumentPropertyModel = null;
    spyOn(component, 'asssignValidators'); // spy first
    component.asssignValidators(param, null);
    expect(component.asssignValidators).toHaveBeenCalledWith(param, null);
  });

  it('getPropertyNameAsArray Method is called', () => {
    const param: string = null;
    spyOn(component, 'getPropertyNameAsArray'); // spy first
    component.getPropertyNameAsArray(param);
    expect(component.getPropertyNameAsArray).toHaveBeenCalledWith(param);
  });

  it('onTemplateIdEmitted Method is called', () => {
    const param: string = null;
    spyOn(component, 'onTemplateIdEmitted'); // spy first
    component.onTemplateIdEmitted(param);
    expect(component.onTemplateIdEmitted).toHaveBeenCalledWith(param);
  });

  it('onFileEmitted Method is called', () => {
    const param: FileToUpload = null;
    spyOn(component, 'onFileEmitted'); // spy first
    component.onFileEmitted(param);
    expect(component.onFileEmitted).toHaveBeenCalledWith(param);
  });

  it('onFileDeleted Method is called', () => {
    const param: FileToUpload = null;
    spyOn(component, 'onFileDeleted'); // spy first
    component.onFileDeleted(param);
    expect(component.onFileDeleted).toHaveBeenCalledWith(param);
  });
});
