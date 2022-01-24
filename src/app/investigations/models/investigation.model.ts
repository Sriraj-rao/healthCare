import { ContactInfo } from "src/app/shared/models/contact-info.model";

export class InvestigationModel{
    investigationId: number;
    investigationSubCategory: string;
    investigationCategory: string;
    investigationStatus: string;
    number: string;
    effectiveDate: string;
    lastActivity: string;
    proofOfLoss: string;
    pendCode: number;
    age: number;
    totalCharges: number;
    totalAmountAfterDiscount: number;
    isInvestigationRowClicked?: boolean;
    claimNum: string;
    policyNo: string;
    claimant: string;
    address: string;
    investigationCategoryId: number;
    investigationDecisionId: number;
    investigationGroupId: number;
    investigationStatusId: number;
    investigationSubCategoryId: number;
    isMultipleInvestigationsAvailable: boolean;
    policyEffectiveDate: string;
    claimDate: string | number | Date;
    contact: ContactInfo;
}
