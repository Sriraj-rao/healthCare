import { ContactInfo } from './contact-info.model';
import { PPONetwork } from './ppo-network.model';

export class PolicyAccountDetails{
    currentPolicyNo: string;
    policyHolder: ContactInfo;
    currentAccountStatuses: any[];
    isCurrentAccountStatuses: boolean;
    ppoInformation: PPONetwork[];
    selectedTab: number;
}
