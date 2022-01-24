import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseTObject } from 'src/app/shared/models/api-response-t-object.model';
import { ApiResponseTCollection } from 'src/app/shared/models/api-response-t-collection.model';
import {
  CompaniesDropdownModel,
  RequestTypeDropdownModel,
  DeliveryMethodsModel,
  RequestTypesModel,
} from '../models/doc-rquest-dropdowns.model';
import { NewDocumentRequestModel } from '../models/new-doc-request.model';
import { DocumentRequestsModel } from '../models/document-requests.model';
import { DocumentPropertyModel } from '../models/document-property-values.model';
import { UploadDocumentModel } from '../models/upload-document.model';
import { DocumentRequestDetailsModel } from '../models/document-request-details.model';
import { MiscellaneousDocumentsModel } from '../models/miscellaneous-documents.model';
import { UploadMiscellaneousDocumentsModel } from '../models/upload-miscellaneous-doc.model';
import { AttachMiscllaneousDocumentToRequestModel } from '../models/attach-misc-doc.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';

  // gets all company details
  public getAllCompanies(): Observable<
    ApiResponseTCollection<CompaniesDropdownModel>
  > {
    return this.http.get<any>(this.dataServiceUrl + `Document/GetAllCompanies`);
  }

  // gets all request types
  public getAllRequestTypes(
    isDenialSection: boolean
  ): Observable<ApiResponseTCollection<RequestTypeDropdownModel>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Document/GetAllRequestTypes/${isDenialSection}`
    );
  }

  // gets all properties by request
  public getPropertiesByRequest(
    companyId: number,
    requestTypeId: number
  ): Observable<ApiResponseTCollection<DocumentPropertyModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Document/GetPropertiesByRequest/${companyId}/${requestTypeId}`
    );
  }

  // creates a new document request
  public createNewDocumentRequest(
    postData: NewDocumentRequestModel
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/CreateNewDocumentRequest`,
      postData
    );
  }

  // gets the preview document api
  public previewDocument(
    postData: NewDocumentRequestModel
  ): Observable<ApiResponseTObject<string>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/PreviewDocument`,
      postData
    );
  }

  // gets the document request by investigation
  public getDocumentRequestsByInvestigation(
    investigationId: number,
    isDenial: boolean
  ): Observable<ApiResponseTCollection<DocumentRequestsModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Document/GetDocumentRequestsByInvestigation/${investigationId}/${isDenial}`
    );
  }

  // gets the document template values
  public getDocumentTemplatePropertyValues(
    requestId: number
  ): Observable<ApiResponseTCollection<DocumentPropertyModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Document/GetDocumentTemplatePropertyValues/${requestId}`
    );
  }

  // gets all delivery methods
  public getAllDeliveriyMethods(): Observable<
    ApiResponseTCollection<DeliveryMethodsModel>
  > {
    return this.http.get<any>(
      this.dataServiceUrl + `Document/GetAllDeliveriyMethods`
    );
  }

  // uploading the document - post method
  public uploadDocument(
    postData: UploadDocumentModel
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/UploadDocument`,
      postData,
      { observe: 'response' }
    );
  }
  // gets document request details
  public getDocumentRequestDetails(
    requestId: number
  ): Observable<ApiResponseTObject<DocumentRequestDetailsModel>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Document/GetDocumentRequestDetails/${requestId}`
    );
  }

  // creates a new reminder request
  public createNewReminderRequest(
    requestId: number
    // createdBy: string
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/CreateNewReminderRequest/${requestId}`,
      {}
    );
  }

  // closes the document request
  public closeRequest(
    requestId: number
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/CloseDocumentRequest/${requestId}`,
      {}
    );
  }

  // gets the miscellaneous documents
  public getMiscellaneousDocuments(
    investigationId: number
  ): Observable<ApiResponseTCollection<MiscellaneousDocumentsModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Document/GetMiscellaneousDocuments/${investigationId}`
    );
  }

  // uploading the miscellaneous document - post method
  public uploadMiscellaneousDocument(
    postData: UploadMiscellaneousDocumentsModel
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/UploadMiscellaneousDocument`,
      postData
    );
  }

  // attaching the miscellaneous document request
  public attachMiscDocToRequest(
    postData: AttachMiscllaneousDocumentToRequestModel
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/AttachMiscDocToRequest`,
      postData
    );
  }

  // gets document request by request type
  public getDocumentRequestsByRequestType(
    requestTypeId: number,
    investigationId: number
  ): Observable<ApiResponseTCollection<RequestTypesModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Document/GetDocumentRequestsByRequestType/${requestTypeId}/${investigationId}`
    );
  }

  // delets the miscellaneous document
  public deleteDoc(
    documentId: number
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Document/DeleteDocument/${documentId}`,
      {}
    );
  }
}
