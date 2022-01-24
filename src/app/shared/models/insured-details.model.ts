import { CoverageSummary } from 'src/app/policy-account/insured/models/coverage-summary.model';

export class InsuredDetailsModel{
    coverageSummaries: CoverageSummary[];
    currentPolicyNo: string;
    totalResults: number;
    fromDate: Date;
    noRecords: boolean;
}
