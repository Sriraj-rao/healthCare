import { DocumentRequestsModel } from 'src/app/investigations/models/document-requests.model';

export class DocumentRequestStateDetails{
    investigationNumber: string;
    dataByReqType: (DocumentRequestsModel[])[];
}
