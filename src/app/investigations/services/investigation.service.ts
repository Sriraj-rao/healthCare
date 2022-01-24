import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseTCollection } from 'src/app/shared/models/api-response-t-collection.model';
import { InvestigationModel } from '../models/investigation.model';
import { ApiResponseTObject } from 'src/app/shared/models/api-response-t-object.model';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { AttachClaimModel } from '../models/attach-claim.model';
import { CloseInvestigationModel } from '../models/close-investigation.model';
import { UpdateInvestigationType } from '../models/update-investigation-type.model';
import { ReopenInvestigationModel } from '../models/reopen-investigation.model';
import { PaymentTypes } from '../models/payment-types.model';
import { UpdatePendCode } from '../models/update-claim-pend-code.model';

@Injectable({
  providedIn: 'root',
})
export class InvestigationsService {
  constructor(private http: HttpClient) {}
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';

  // gets the investigation by id
  public getInvestigationByID(
    invID: string,
    invNumber: string
  ): Observable<ApiResponseTObject<InvestigationModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Investigation/GetInvestigationById/${invID}/${invNumber}`
    );
  }

  // gets the investigation by claim number
  public getInvestigationsByClaimNumber(
    claimNumber: string
  ): Observable<ApiResponseTCollection<InvestigationModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Investigation/GetInvestigationsByClaimNum/${claimNumber}`
    );
  }

  // gets the investigation by policy number
  public getInvestigationsByPolicyNo(
    policyNo: string
  ): Observable<ApiResponseTCollection<InvestigationModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Investigation/GetInvestigationsByPolicyNo/${policyNo}`
    );
  }

  // gets the effective date
  public getEffectiveDate(
    invID: string,
    claimNumber: string
  ): Observable<ApiResponseTObject<string>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Investigation/GetEffectiveDate/${invID}/${claimNumber}`
    );
  }

  // gets the claims attached
  public getClaimsAttached(
    invID: number, isClosed: boolean
  ): Observable<ApiResponseTCollection<Claim>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Investigation/GetClaimsByInvestigation/${invID}/${isClosed}`
    );
  }

  // attches the claims to investigation
  public attachClaimsToInvestigation(
    postData: AttachClaimModel[]
  ): Observable<ApiResponseTCollection<Claim>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Investigation/InsertClaimToInvestigation`,
      postData
    );
  }

  // closes the claims
  public closeClaims(
    postData: CloseInvestigationModel[]
  ): Observable<ApiResponseTCollection<Claim>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Investigation/CloseInvestigation`,
      postData
    );
  }

  // updates the investigation type - post method
  public updateInvestigationType(
    postData: UpdateInvestigationType
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Investigation/UpdateInvestigationType`,
      postData
    );
  }

  // gets the investigation decisions
  public getInvestigationDecisions(): Observable<ApiResponseTCollection<any>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Investigation/GetAllInvestigationDecisions`
    );
  }

  // reopens the investigation
  public reopenInvestigation(
    postData: ReopenInvestigationModel
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Investigation/ReOpenInvestigation`,
      postData
    );
  }

  // gets the all payment types
  public getAllPaymentTypes(): Observable<
    ApiResponseTCollection<PaymentTypes>
  > {
    return this.http.get<any>(
      this.dataServiceUrl + `Investigation/GetAllPaymentTypes`
    );
  }

  // updates the claim pendcode
  public updateClaimPendCode(
    postData: UpdatePendCode
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Investigation/UpdateClaimPendCode`,
      postData
    );
  }
}
