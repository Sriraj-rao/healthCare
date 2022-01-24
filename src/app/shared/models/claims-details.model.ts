import { Claim } from 'src/app/policy-account/claims/Models/claim';

export class ClaimsDetailsModel{
    currentPolicyNo?: string;
    claimNo?: string;
    isSingleClaim: boolean;
    claimsDatasource: Claim[];
    noRecords: boolean;
    isNewInvAdded: boolean;
}
