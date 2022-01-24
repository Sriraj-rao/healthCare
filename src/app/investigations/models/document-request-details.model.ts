import { DocumentPropertyModel } from './document-property-values.model';
import { DocFileIds } from './doc-file-ids.model';

export class DocumentRequestDetailsModel{
    company: string;
    requestType: string;
    companyId: number;
    requestTypeId: number;
    documentFiles: DocFileIds[];
    propertyValues: DocumentPropertyModel[];
}
