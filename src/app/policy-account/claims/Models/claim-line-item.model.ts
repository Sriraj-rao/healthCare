/**
 * Claim line item
 */
export interface ClaimLineItem {
    /** Claim Number */
    claimNum: string;
    /** Claim Date */
    claimDate: Date;
    /** Claim Thru Date */
    claimThruDate: Date;
    /** Received Date */
    receivedDate: Date;
    /** Processed Date */
    processedDate: Date | null;
    /** Name */
    name: string;
    /** Policy Number */
    policyNo: string;
    /** Status */
    status: string;
    /** Pending Code */
    pendCode: number;
    /** Diagnosis */
    diagnosis: string;
    /** Diagnosis Description */
    diagnosisDesc: string;
    /** Benefit Type */
    benType: string;
    /** Benefit Line Number */
    benefitLine: number;
    /** Provider Payment Number */
    providerPaymentNo: number;
    /** Adjustment Number */
    adjustmentNo: number;
    /** Provider Name */
    providerName: string;
    /** Total Charges */
    totalCharges: number;
    /** Amount Charged */
    amountCharged: number;
    /** Deductible Applied */
    deductibleApplied: number;
    /** Paid Amount */
    paidAmount: number;
    /** Indicator */
    indicator: string;
    /** PPO Indicator */
    ppoIndicator: string;
    /** Procedure Code */
    procedureCode: string;
    /** Procedure Description */
    procedureDesc: string;
    /** PPO Discount */
    ppoDiscount: number | null;
    /** Remark Code 1 */
    remarkCode1: string;
    /** Remark Code 2 */
    remarkCode2: string;
    /** Remark Description 1 */
    remarkDesc1: string;
    /** Remark Description 2 */
    remarkDesc2: string;
    /** Miscellaneous Information Indicator */
    miscInfo: boolean;
    /** Comment */
    comment: string;
  }
