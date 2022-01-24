import {
    DateHelper
  } from 'src/app/shared/class/date-helper';

  /**
   * Claim Detail
   */
export class ClaimDetail {
    /** Date of service */
    private _dateOfService: string = null;
    /** Processed date */
    private _processedDate: string = null;

    /** Claim Number */
    claimNumber: string;
    /** Claim Status */
    claimStatus: string;
    /** Claimant Name */
    claimantName: string;
    /** Policy Number */
    policyNumber: string;
    /** Provider Name */
    providerName: string;
    /** Provider Check Amount */
    providerCheckAmount: number;
    /** Provider Check Number */
    providerCheckNumber: string;
    /** Employee Check Amount */
    employeeCheckAmount: number;
    /** Employee Check Number */
    employeeCheckNumber: string;
    /** Diagnosis */
    diagnosis: string;
    /** Benefit Type */
    benefitType: string;
    /** Procedure Code */
    procedureCode: string;
    /** Place Of Service */
    placeOfService: string;
    /** Remark Codes */
    RemarkCodes: string;
    /** Total Submitted Charges */
    totalSubmittedCharges: number;
    /** Not Covered Amount */
    notCoveredAmount: number;
    /** Base Deductible Amount */
    baseDeductibleAmount: number;
    /** Basic Benefit */
    basicBenefit: number;
    /** Covered Expense */
    coveredExpense: number;
    /** Deductible Expense */
    deductibleExpense: number;
    /** Benefit Amount */
    benefitAmount: number;
    /** Patient Number */
    patientNumber: string;
    /** Last User */
    lastUser: string;

    /** Get Date Of Service */
    public get dateOfService(): Date {
      return DateHelper.toDate(this._dateOfService);
    }

    /** Set Date of Serive */
    public set dateOfService(dateOfSvc: Date) {
      this._dateOfService = dateOfSvc.toString();
    }

    /** Get Processed Date */
    public get processedDate(): Date {
      return DateHelper.toDate(this._processedDate);
    }

    /** Set Processed Date */
    public set processedDate(procDate: Date) {
      this._processedDate = procDate.toString();
    }
  }
