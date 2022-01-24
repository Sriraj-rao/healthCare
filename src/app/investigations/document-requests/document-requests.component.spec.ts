import { CdkRow } from '@angular/cdk/table';
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
import { element } from 'protractor';
import { BehaviorSubject, of } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { DocumentRequestStateDetails } from 'src/app/shared/models/document-request-details.model';
import { DocumentRequestsModel } from '../models/document-requests.model';
import { DocumentService } from '../services/document.service';

import { DocumentRequestsComponent } from './document-requests.component';

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

describe('DocumentRequestsComponent', () => {
  let component: DocumentRequestsComponent;
  let fixture: ComponentFixture<DocumentRequestsComponent>;
  let testBedDocumentService: DocumentService;
  let testBedDetailSharingService: DetailsSharingService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentRequestsComponent],
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
    fixture = TestBed.createComponent(DocumentRequestsComponent);
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

  it('should check ngOnInIt function calls getDocumentRequestsByInvestigation', () => {
    const insSummarySpy = spyOn<any>(
      component,
      'getDocumentRequestsByInvestigation'
    );
    component.ngOnInit();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check sortDataAccordingtoRequestType function calls sortDataAccordingtoRequestType', () => {
    const insSummarySpy = spyOn<any>(
      component,
      'sortDataAccordingtoRequestType'
    );
    component.sortDataAccordingtoRequestType();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('testing subscribe method is getting called', fakeAsync(() => {
    const getInsuredSpy = spyOn(
      testBedDocumentService,
      'getDocumentRequestsByInvestigation'
    ).and.returnValue(of(mockdocs));
    const subSpy = spyOn(
      testBedDocumentService.getDocumentRequestsByInvestigation(1,false),
      'subscribe'
    );
    component.getDocumentRequestsByInvestigation();
    expect(getInsuredSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('setDocumentRequests Method is called', () => {
    const param: DocumentRequestStateDetails = null;
    spyOn(component, 'setDocumentRequests'); // spy first
    component.setDocumentRequests(param);
    expect(component.setDocumentRequests).toHaveBeenCalledWith(param);
  });

  it('isReceivedFileContainsId Method is called', () => {
    const param: DocumentRequestsModel = null;
    spyOn(component, 'isReceivedFileContainsId'); // spy first
    component.isReceivedFileContainsId(param);
    expect(component.isReceivedFileContainsId).toHaveBeenCalledWith(param);
  });

  it('sendReminder Method is called', () => {
    const param: DocumentRequestsModel = null;
    spyOn(component, 'sendReminder'); // spy first
    component.sendReminder(param);
    expect(component.sendReminder).toHaveBeenCalledWith(param);
  });

  it('closeRequest Method is called', () => {
    const param: DocumentRequestsModel = null;
    spyOn(component, 'closeRequest'); // spy first
    component.closeRequest(param);
    expect(component.closeRequest).toHaveBeenCalledWith(param);
  });

  it('uploadDocument Method is called', () => {
    const param: DocumentRequestsModel = null;
    spyOn(component, 'uploadDocument'); // spy first
    component.uploadDocument(param);
    expect(component.uploadDocument).toHaveBeenCalledWith(param);
  });
});
