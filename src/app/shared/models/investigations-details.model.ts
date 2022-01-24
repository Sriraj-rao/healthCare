import { InvestigationModel } from 'src/app/investigations/models/investigation.model';

export class InvestigationDetailsModel{
    invName: string;
    invAddress: string;
    currentID: string;
    invId: string;
    effectiveDate: string;
    isViewAllInvestigations: boolean;
    noRecords: boolean;
    investigationDetails: InvestigationModel[];
    policyEffectiveDate: string;
    investigationGroupId: number;
}
