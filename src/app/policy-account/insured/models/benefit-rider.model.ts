import { MemberCoverage } from '../../../shared/models/member-coverage.model';

/**
 * Benefit Rider
 */
export class BenefitRider extends MemberCoverage {
  /** Plan Code */
  planCode: string;
  /** Plan Group */
  planGroup: string;
  /** Group Number */
  groupNo: string;
  /** Short Description */
  shortDesc: string;
  /** Print Description */
  printDesc: string;
  /** Reissue Date */
  reissueDate: string;
  /** Paperless Indicator */
  paperlessIndicator: string;
  /** Insured's Fullname or Display Name */
  displayName: string;
}
