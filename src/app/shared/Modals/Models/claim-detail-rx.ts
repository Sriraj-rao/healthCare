import {
    DateHelper
  } from 'src/app/shared/class/date-helper';

  /**
   * Claim Detail for a prescription
   */
export class ClaimDetailRx {
    /** Date written */
    private _dateWritten: string = null;

    /** Date Filled */
    private _dateFilled: string = null;

    /** Claim Number */
    claimNo: string;
    /** Claim Status */
    claimStatus: string;
    /** Drug Name */
    drugName: string;
    /** Therapeutic Class */
    therapeuticClass: string;
    /** Drug Strength */
    drugStrength: string;
    /** New/Refill Code */
    newRefillCode: number;
    /** Metric Quantity */
    metricQuantity: number;
    /** Days Supply */
    daysSupply: number;
    /** Generic Code */
    genericCode: string;
    /** Provider Name */
    providerName: string;
    /** Prescriber Number */
    prescriberNo: string;

    /** Get Date Written */
    public get dateWritten(): Date {
      return DateHelper.toDate(this._dateWritten);
    }

    /** Set Date Written */
    public set dateWritten(dateWritten: Date) {
      this._dateWritten = dateWritten.toString();
    }

    /** Pharmacy Name */
    pharmacyName: string;
    /** Pharmacy Address */
    pharmacyAddress: string;
    /** Prescription Number */
    prescriptionNo: string;

    /** Get Date Filled */
    public get dateFilled(): Date {
      return DateHelper.toDate(this._dateFilled);
    }

    /** Set Date Filled */
    public set dateFilled(dateFilled: Date) {
      this._dateFilled = dateFilled.toString();
    }
  }
