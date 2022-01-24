import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponseT } from '../../models/api-response-t.model';
import { ApiResponseTCollection } from '../../models/api-response-t-collection.model';
import { Claim } from 'src/app/policy-account/claims/Models/claim';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
  public searchForAccountCustomer(searchText: string): Observable<ApiResponse> {
    const params = new HttpParams();

    return this.http.get<ApiResponse>(this.dataServiceUrl + `Contact/GetSearchResult/${searchText}`, {
      params
    });
  }

  public getPolicyNumberByClientNumber(clientNumber: string): Observable<ApiResponseT<string>> {
    const params = new HttpParams();

    return this.http.get<ApiResponseT<string>>(this.dataServiceUrl + `Coverage/GetPolicyNoByClientNo/${clientNumber}`, {
      params
    });
  }

  public getClaimsByClaimNumber(claimNumber: string): Observable<ApiResponseTCollection<Claim>> {
    const params = new HttpParams();

    return this.http.get<any>(this.dataServiceUrl + `Claims/GetClaimsByClaimNo/${claimNumber}`, {
      params
    });
  }



}
