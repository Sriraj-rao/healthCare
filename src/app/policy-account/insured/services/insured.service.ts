import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CoverageSummary } from '../models/coverage-summary.model';
import { ApiResponseTCollection } from '../../../shared/models/api-response-t-collection.model';

@Injectable({
  providedIn: 'root',
})
export class InsuredService {
  constructor(private http: HttpClient) {}

  private dataServiceUrl = environment.config.apiHostUrl + 'api/';

  // Api to fetch the Insured Coverage Summaries
  public getInsuredCoverageSummaries(
    policyCtrlNo: string
  ): Observable<ApiResponseTCollection<CoverageSummary>> {
    return this.http.get<ApiResponseTCollection<CoverageSummary>>(
      this.dataServiceUrl +
        `Coverage/GetInsuredCoverageSummaries/${policyCtrlNo}`,
      {}
    );
  }
}
