import { MemberCoverage } from '../../../shared/models/member-coverage.model';
import { BenefitRider } from './benefit-rider.model';
import { ExclusionRider } from './exclusion-rider.model';

  /**
   * Insured Coverage
   */
export class InsuredCoverage extends MemberCoverage {
    /** Display Name or Full Name */
    displayName: string;
    /** Reissue Date */
    reissueDate: string;
    /** Lapse Date */
    lapseDate: string;

    /** List of benefit riders */
    benefitRiders: BenefitRider[];
    /** List of Exclusion riders */
    exclusionRiders: ExclusionRider[];
    dob: string;

  }
