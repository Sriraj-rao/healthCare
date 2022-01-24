import { Claim } from 'src/app/policy-account/claims/Models/claim';

/**
 * Paging response
 */
export interface SingleClaim {
    /** Data */
    data: Claim[];
    isSuccess?:boolean;
}
