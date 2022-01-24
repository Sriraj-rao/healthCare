import { Claim } from 'src/app/policy-account/claims/Models/claim';

export class AttachedClaimsInjectedData{
    investigationId: number;
    investigationNumber: string;
    investigationType: string;
    attachedClaims: Claim[];
    claimNo: string;
    policyNo: string;
}
