import { InsuredCoverage } from './insured-coverage.model';


/**
 * Coverage Summary
 */
export class CoverageSummary {
    /** App type */
    appType: string;
    /** Contract type */
    contractType: number;
    /** Control Number */
    controlNo: string;
    /** Issue state */
    issueState: string;
    /** Plan Name */
    planName: string;
    /** Company name */
    companyName: string;
    /** Plan group */
    planGroup: string;
    /** Policy Number */
    policyNo: string;
    /** Paid to date */
    paidToDate: string;
    /** Status */
    status: string;
    /** Suspend Code */
    suspendCode: string;
    /** Comment */
    comment: string;
    /** Print description */
    printDesc: string;
    /** Paperless indicator */
    paperlessIndicator: string;
    /** Policy published indicator */
    policyPublished: boolean;
    /** Rider plan type */
    riderPlanType: string;
    /** HCP policy number */
    hcpPolicyNo: string;
    /** List of Insured Coverages */
    insuredCoverages: InsuredCoverage[];
    /** Indicator the highlight the distinct control number in UI */
    highlightControlNo = false;
}
