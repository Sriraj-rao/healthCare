import { AdminFormFieldModel } from '../form-fields.model';

export class DocUpdateFormInjected {
    formType: string;
    requestTypeId: number;
    companyId: number;
    fields: AdminFormFieldModel[];
    header: string;
}