import { DocFileIds } from './doc-file-ids.model';

export class DocumentRequestsModel {
    requestId: number;
    requestType: string;
    number: string;
    requestNumber: string;
    requestDate: string;
    receivedDate: string;
    deliveryMethod: string;
    requestedDocFileIds: DocFileIds[];
    receivedDocFileIds: DocFileIds[];
    isActive: boolean;
    isReminderRequired: boolean;
    panelOpenState?: boolean;
    isVerified: boolean;
    providerName: string;
    companyId: number;
    requestTypeId: number;
    templateId: number;
}
