import { InvestigationModel } from 'src/app/investigations/models/investigation.model';

export class InvestigationTabDetails {
    investigations: InvestigationModel[];
    policyNo: string;
    noInvestigations: boolean;
    isInvUpdated: boolean;
}
