import { DocFileIds } from './doc-file-ids.model';

export class NewDocumentRequestModel {
    investigationId: number;
    companyId: number;
    requestTypeId: number;
    propertyInputDtos: {
        propertyId: number;
        propertyValue: string;
    }[];
    requestNumber: number;
    // createdByUser: string;
    templateFileId: string;
    policyNo: string;
    claimNo: string;
    files: DocFileIds[];
    requestId: number;
    comment: string;
}
