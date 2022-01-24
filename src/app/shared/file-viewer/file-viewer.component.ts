import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from 'src/app/investigations/services/document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { environment } from 'src/environments/environment';
import { NewDocumentRequestModel } from 'src/app/investigations/models/new-doc-request.model';

@Component({
  selector: 'cwb-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, OnChanges {
  url: SafeResourceUrl;
  isLoading: boolean;
  isTablePreview: boolean;
  @Input() alreadyExistingTemplateId;
  @Input() postData: NewDocumentRequestModel;
  @Output() templateFileIdEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() tableFileId: string;
  prevId: string;
  showURL: boolean;
  loadCount: number;

  constructor(
    public dialogRef: MatDialogRef<FileViewerComponent>,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public fileViewerData: { fileId: string },
    private docService: DocumentService
  ) {}

  ngOnInit(): void {
    if (this.fileViewerData?.fileId) {
      this.showURL = false;
      this.isLoading = true;
      this.assignUrlForTalePreview(this.fileViewerData.fileId);
    }
  }

  ngOnChanges(event) {
    console.log(event);
    this.checkFileToPreview();
  }

  checkFileToPreview() {
    console.log(this.fileViewerData, this.alreadyExistingTemplateId);
    if (this.fileViewerData?.fileId) {
      this.showURL = false;
      this.isLoading = true;
      this.assignUrlForTalePreview(this.fileViewerData.fileId);
    } else {
      if (this.tableFileId) {
        if (this.prevId !== this.tableFileId) {
          this.showURL = false;
          this.isLoading = true;
        }
        this.prevId = this.tableFileId;
        this.assignUrlForTalePreview(this.tableFileId);
      } else {
        if (
          this.alreadyExistingTemplateId &&
          this.alreadyExistingTemplateId !== null
        ) {
          if (this.prevId != this.alreadyExistingTemplateId) {
            this.showURL = false;
            this.isLoading = true;
          }
          this.prevId = this.alreadyExistingTemplateId;
          this.assignUrlForTalePreview(this.alreadyExistingTemplateId);
        } else {
          this.previeDocument();
        }
      }
    }
  }
  // calls the api for previewing the documnet
  previeDocument() {
    this.docService.previewDocument(this.postData).subscribe((response) => {
      if (response.data) {
        if (this.prevId !== response.data) {
          this.showURL = false;
          this.isLoading = true;
        }
        this.prevId = response.data;
        this.assignUrlForTalePreview(response.data);
        this.isLoading = true;
        this.templateFileIdEmitter.emit(response.data);
      }
    });
  }
  // assigns the url for table preview
  assignUrlForTalePreview(fileId: string) {
    this.loadCount = 0;
    // this.url = environment.config.fileDownloadUrl + fileId;
    var url = `https://docs.google.com/gview?url=${
      environment.config.fileDownloadUrl + fileId
    }&embedded=true`;
    // var url= `https://view.officeapps.live.com/op/view.aspx?src=URLEncode(${environment.config.fileDownloadUrl + fileId})`
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // if (!this.fileViewerData?.fileId) {
    //   this.cdr.detectChanges();
    // }
    // this.cdr.detectChanges();
    this.showURL = true;
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  // removes the loader when the required data is loaded
  onLoaded(e) {
    console.log(e, 'LOADED');
    this.loadCount = this.loadCount + 1;
    if (this.loadCount === 2) {
      this.isLoading = false;
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
