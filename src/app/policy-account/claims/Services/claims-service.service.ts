import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseTCollection } from 'src/app/shared/models/api-response-t-collection.model';

import { Claim } from '../Models/claim';
import { ViewClaims } from '../Models/viewClaims';
import { ApiResponseT } from 'src/app/shared/models/api-response-t.model';
import { MiscInfoModel } from '../Models/misc-info.model';

/**
 * Claims Service
 */
@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  /**
   * API base url
   */
  constructor(private http: HttpClient) {}
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
  /**
   * Gets the details for the specified claim
   * @param claimNumber: string
   */

  // Gets the paginated list of Claims
  public getPaginatedClaims(
    policyCtrlNo: string,
    isStatusFiltered: boolean
  ): Observable<ApiResponseTCollection<Claim>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        'Claims/GetClaimsByPolicyControlNo/' +
        policyCtrlNo +
        '/' +
        isStatusFiltered
    );
  }

  // Get list of Claims by Claim Number
  public getClaimsByClaimNumber(
    claimNumber: string
  ): Observable<ApiResponseTCollection<Claim>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Claims/GetClaimsByClaimNo/${claimNumber}`
    );
  }

  // To view thelist of Claims by Claim Number
  public getViewClaimsByClaimNumber(
    claimNumber: string
  ): Observable<ApiResponseTCollection<ViewClaims>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Investigation/GetInvestigationsByClaimNum/${claimNumber}`
    );
  }
  // To view thelist of ClaimDetails by Claim Number
  public getViewClaimDetailsByClaimNumber(
    claimNumber: string
  ): Observable<ApiResponseT<any>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Claims/GetClaimDetails/${claimNumber}`
    );
  }

  public getMiscInfo(
    policyNumber: string,
    claimNumber: string
  ): Observable<ApiResponseTCollection<MiscInfoModel>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Claims/GetMiscInfo/${claimNumber}/${policyNumber}`
    );
    // return this.http.get <any> ('https://ushg-customerdashboard-api-dev.azurewebsites.net/api/'
    // + `Claims/GetMiscInfo/${claimNumber}/pn/${policyNumber}`);
  }
}
