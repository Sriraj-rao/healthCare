import {
    ClaimLineItem
  } from './claim-line-item.model';

  /**
   * Claim
   */
export interface Claim {
    /** Benefit Type */
    benefitType: string;
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
    /** Provider Name */
    providerName: string;
    /** EOB Indicator */
    indicator: string;
    /** Status */
    status: string;
    /** Pend Code */
    pendCode: number;
    /** Diagnosis */
    diagnosis: string;
    /** Diagonis Description */
    diagnosisDesc: string;
    /** Total Charges */
    totalCharges: number;
    /** Total Deductible */
    totalDeductible: number;
    /** Total Paid */
    totalPaid: number;
    /** Paid Amount */
    paidAmount: number;
    /** Miscellaneous Information */
    miscInfo: boolean;
    /** Comment */
    comment: string;
    /** List of Line Items */
    lineItems: ClaimLineItem[];
    isInvestigationExisting?: boolean;
    investigationTypes: string;
    isCheckboxClicked?: boolean;
    decisionId?: number;
    pendingAmount?: number;
    index?: number;
    decision?: string;
    decisionDate?: string;
    paidAs?: string;
    isExpanded?: boolean;
    isDisabled?: boolean;
  }
