import { AgentInfo } from './agent-info.model';

/**
 * Contact Info
 */
export class ContactInfo {
  /**
   * Address
   */
  address: string;
  addressLine1: string;
  addressLine2: string;
  /**
   * City
   */
  city: string;
  /**
   * State
   */
  state: string;
  /**
   * Zip Code
   */
  zip: string;
  /**
   * Client Number
   */
  clientNo: string;
  /**
   * Effective Date
   */
  effectiveDate: Date;
  /**
   * Email
   */
  email: string;
  /**
   * Fax
   */
  fax: string;
  /**
   * Home Phone
   */
  homePhone: string;
  /**
   * Insured Name
   */
  insuredName: string;
  /**
   * First Name
   */
  firstName: string;
  /**
   * Middle Name
   */
  middleName: string;
  /**
   * Last Name
   */
  lastName: string;
  /**
   * Is Homeland Policy
   */
  isHomelandPolicy: boolean;
  /**
   * Is Paperless
   */
  isPaperless: boolean;
  /**
   * Litigation Indicator
   */
  litigationIndicator: boolean;
  /**
   * Non Gf Indicator
   */
  nonGfIndicator: boolean;
  /**
   * Pre Ex Indicator
   */
  preExindicator: boolean;
  /**
   * Status
   */
  status: string;
  /**
   * Work Phone
   */
  workPhone: string;
  /**
   * Agent Info
   */
  agentInfo: AgentInfo;
  companyCode: string;
}
