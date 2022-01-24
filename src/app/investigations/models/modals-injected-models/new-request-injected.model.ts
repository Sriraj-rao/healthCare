import { InvestigationModel } from '../investigation.model';
import { NewDocumentRequestModel } from '../new-doc-request.model';

export class NewDocRequestInjectedData {
    isEdit: boolean;
    requestId: number;
    requestNumber: string;
    investigationId: number;
    investigationNumber: string;
    investigationType: string;
    claimNo: string;
    policyNo: string;
    isDenial: boolean;
    editedPostData: NewDocumentRequestModel;
    parentInvestigationDetail: InvestigationModel;
    dateOfService: string;
}
