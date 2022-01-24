import { Claim } from 'src/app/policy-account/claims/Models/claim';

/**
 * Paging response
 */
export interface PagingResponse {
    /** Data */
    data: Claim[];

    /** Request sequence number */
    draw?: number;

    /** Number of records filtered */
    recordsFiltered: number;

    /** Number of records returned */
    recordsTotal: number;
}
