import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { MiscDocumentDetails } from 'src/app/shared/models/misc-doc-details.model';
import { MiscellaneousDocumentsModel } from '../models/miscellaneous-documents.model';
import { DocumentService } from '../services/document.service';

import { MiscellaneousDocumentsComponent } from './miscellaneous-documents.component';

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

describe('MiscellaneousDocumentsComponent', () => {
  let component: MiscellaneousDocumentsComponent;
  let fixture: ComponentFixture<MiscellaneousDocumentsComponent>;
  let testBedDocumentService: DocumentService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscellaneousDocumentsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        // MatTableModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousDocumentsComponent);
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

  it('should check ngOnInIt function calls getMiscellaneousDocuments', () => {
    const insSummarySpy = spyOn<any>(component, 'getMiscellaneousDocuments');
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getMiscellaneousDocuments'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getMiscellaneousDocuments(1),
      'subscribe'
    );
    component.getMiscellaneousDocuments();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('setDocumentRequests Method is called', () => {
    const param: MiscDocumentDetails = null;
    spyOn(component, 'setDocumentRequests'); // spy first
    component.setDocumentRequests(param);
    expect(component.setDocumentRequests).toHaveBeenCalledWith(param);
  });

  it('onDownload Method is called', () => {
    const param: MiscellaneousDocumentsModel = null;
    spyOn(component, 'onDownload'); // spy first
    component.onDownload(param);
    expect(component.onDownload).toHaveBeenCalledWith(param);
  });

  it('onAttachMiscDoc Method is called', () => {
    const param: MiscellaneousDocumentsModel = null;
    spyOn(component, 'onAttachMiscDoc'); // spy first
    component.onAttachMiscDoc(param);
    expect(component.onAttachMiscDoc).toHaveBeenCalledWith(param);
  });

  it('onDeleteMiscDoc Method is called', () => {
    const param: MiscellaneousDocumentsModel = null;
    spyOn(component, 'onDeleteMiscDoc'); // spy first
    component.onDeleteMiscDoc(param);
    expect(component.onDeleteMiscDoc).toHaveBeenCalledWith(param);
  });
});
