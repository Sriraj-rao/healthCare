import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationPopupModalRequest } from '../models/notification-popup.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyAccountsService {
  constructor(private http: HttpClient) {}
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
  tempURL: 'https://ushg-customerdashboard-api-dev.azurewebsites.net/api/';

  // gets the contact information using a policy control number
  public getContactInfoByPolicyControlNo(
    policyCtrlNo: string,
    type?: string
  ): Observable<ApiResponse> {
    let apiRoute = '';
    if (type) {
      // apiRoute = `Contact/GetContactInfo/${policyCtrlNo.toUpperCase()}/${type.toUpperCase()}`;
    } else {
      apiRoute = `Contact/GetContactInfo/${policyCtrlNo}`;
    }
    return this.http.get<ApiResponse>(this.dataServiceUrl + apiRoute);
  }
  // gets the account status indiactors using policy control number as a parameter
  public getAccountStatusIndicators(
    policyCtrlNo: string
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.dataServiceUrl + `Coverage/GetCoverageIcons/${policyCtrlNo}`
    );
  }
  // gets the ppo information for the particular poicy number
  public getAccountPPOInformation(
    policyCtrlNo: string
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.dataServiceUrl + `Coverage/GetPpoInformation/${policyCtrlNo}`
    );
  }
  // gets the notifications
  public getNotificationPopups(apiRequest: NotificationPopupModalRequest) {
    return this.http.post<any>(
      'https://ushg-customerdashboard-api-dev.azurewebsites.net/api/' +
        'notification/GetNotificationPopups',
      apiRequest
    );
  }
}
