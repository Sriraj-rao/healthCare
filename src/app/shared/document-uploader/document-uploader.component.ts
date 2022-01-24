import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileToUpload } from '../models/file-to-upload.model';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { IconDefinition, faUpload, faFileAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cwb-document-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.scss']
})
export class DocumentUploaderComponent implements OnInit {
  files: any[] = [];
  // icons
  filesToSend: FileToUpload;
  faUpload: IconDefinition = faUpload;
  faFileAlt = faFileAlt;
  faTrashAlt = faTrashAlt;

  totalSize = 0;
  @Input() isMultipleAllowed: boolean;
  @Input() fileuploaded: boolean;
  @Output() filesEmitter: EventEmitter<FileToUpload> = new EventEmitter<FileToUpload>();
  @Output() filesDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private detailsSharing: DetailsSharingService) { }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.fileBrowseHandler($event);

  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    let isSameFile = false;
    for (const y of files) {
      const index = this.files.findIndex(x => x.name === y.name);
      if (index > -1) {
        isSameFile = true;
        break;
      }
    }
    if (isSameFile) {
      this.detailsSharing.openSnackBar(`Cannnot upload same file again.`, 'Dismiss', true);
    }
    else {
      if ((this.filesToSend && !this.isMultipleAllowed) || (files.length > 1 && !this.isMultipleAllowed)) {
        this.detailsSharing.openSnackBar(`Only one file allowed.`, 'Dismiss', true);
      }
      else {
        if (this.isfileTypeAccepted(files)) {
          if (this.isFileGreaterThan10Mb(files)) {
            this.detailsSharing.openSnackBar(`Total file size should be less than 10 Mb.`, 'Dismiss', true);
          }
          else {
            this.filesToSend = null;
            this.readAndUploadFile(files);
          }
        }
        else {
          this.detailsSharing.openSnackBar(`Only .pdf,.doc,.docx and image files allowed.`, 'Dismiss', true);
        }
      }
    }
  }
  // accepts only pdf,word and doc files
  isfileTypeAccepted(files) {
    let count = 0;
    for (const y of files) {
      if (y.type === 'application/pdf' || y.type === 'application/msword' || y.type.includes('image') ||
        y.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        count = count + 1;
      }
    }
    if (count === files.length) {
      return true;
    }
    else {
      return false;
    }
  }
  // checks whether the uploaded file is greater than 10mb or not
  isFileGreaterThan10Mb(files) {
    // for (var y of files) {
    //   this.totalSize = this.totalSize + y.size;
    // }
    // if ((this.totalSize / 1024 / 1024) > 10) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    return false;
  }
  // reads the uploaded file
  readAndUploadFile(files: any) {
    for (const x of files) {
      const file = new FileToUpload();

      // Set File Information
      file.fileName = x.name;
      file.fileSize = x.size;
      file.fileType = x.type;

      // Use FileReader() object to get file to upload
      // NOTE: FileReader only works with newer browsers
      const reader = new FileReader();
      // Setup onload event for reader
      reader.onload = () => {
        file.fileAsBase64 = reader.result.toString();
      };

      // Read the file
      reader.readAsDataURL(x);
      this.filesToSend = file;
      this.filesEmitter.emit(this.filesToSend);
    }
    this.prepareFilesList(files);
  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.totalSize = this.totalSize - this.files[index].size;
    this.files.splice(index, 1);
    this.filesDeleted.emit(index);
    this.filesToSend = null;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
