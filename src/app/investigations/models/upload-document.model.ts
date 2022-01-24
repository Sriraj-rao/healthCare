import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';

export class UploadDocumentModel {
    investigationId: number;
    deliveryId: number;
    requestId: number;
    templateId: number;
    isVerified: boolean;
    receivedDate: string;
    // createdByUser: string;
    policyNo: string;
    claimNo: string;
    files: FileToUpload[];
    comment: string;
    isRequestClosed: boolean;
}
