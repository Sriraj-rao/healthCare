export class DocumentPropertyModel {
    propertyId: number;
    requestId?: number;
    propertyName: string;
    propertyType: string;
    propertyValue?: string;
    parentId?: number;
    isRequired?: boolean;
    length?: number;
    orderBy?: number;
    child?: DocumentPropertyModel[];
    propertyNameAsArray?: any[];
    apiPropertyName?: string;
    apiPropertyType?: string;
    isVisibleOnUI?: boolean;
}
