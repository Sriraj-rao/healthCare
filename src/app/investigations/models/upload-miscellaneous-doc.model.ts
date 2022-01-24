import { FileToUpload } from 'src/app/shared/models/file-to-upload.model';

export class UploadMiscellaneousDocumentsModel{
    investigationId: number;
    deliveryId: number;
    isVerified: boolean;
    name: string;
    receivedDate: string;
    // createdByUser:string;
    files: FileToUpload;
    policyNo: string;
    claimNo: string;
}
