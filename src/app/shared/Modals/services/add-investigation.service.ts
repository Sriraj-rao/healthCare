import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseTCollection } from '../../models/api-response-t-collection.model';
import { AddInvestigation } from '../Models/add-investigation.model';
import { StatusOptions } from 'src/app/investigations/models/status-options.model';
import { SubCategoryModel } from 'src/app/investigations/models/sub-categories.model';
import { InvestigationCategories } from 'src/app/investigations/models/categories.model';
import { PendCodesModel } from 'src/app/investigations/models/pend-codes.model';
import { ReopenClaim } from 'src/app/investigations/models/reopen.model';
import { ApiResponseTObject } from '../../models/api-response-t-object.model';

@Injectable({
  providedIn: 'root'
})
export class AddInvestigationService {


  /**
   * API base url
   */
  constructor(protected http: HttpClient){}
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
// gets all sub categories
  public getAllSubCategories(): Observable<ApiResponseTCollection<SubCategoryModel>> {
    return this.http.get<any>(this.dataServiceUrl + `Investigation/GetAllSubCategories`);
  }
// gets categories by name
  public getCategoriesByName(name: string): Observable<ApiResponseTCollection<InvestigationCategories>> {
    return this.http.get<any>(this.dataServiceUrl + `Investigation/GetCategoriesByName/${name}`);
  }

  // gets all pendcodes
  public getAllPendCodes(): Observable<ApiResponseTCollection<PendCodesModel>> {
    return this.http.get<any>(this.dataServiceUrl + `Investigation/GetAllPendCodes`);
  }
// gets all investigation status
  public getInvestigationstatus(): Observable<ApiResponseTCollection<StatusOptions>> {
    return this.http.get<any>(this.dataServiceUrl + `Investigation/GetAllInvestigationStatuses`);
  }
// creates a new investigation
  public createNewInvestigation(postData: AddInvestigation): Observable<ApiResponseTObject<number>> {
    return this.http.post<any>(this.dataServiceUrl + `Investigation/CreateNewInvestigation`, postData);
  }
// reopen a claim
  public reopenClaim(postData: ReopenClaim): Observable<ApiResponseTCollection<number>> {
    return this.http.post<any>(this.dataServiceUrl + `Investigation/ReOpenClaim`, postData);
  }

}
