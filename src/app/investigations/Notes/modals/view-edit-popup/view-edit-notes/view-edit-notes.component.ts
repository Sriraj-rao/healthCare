import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faPen,
  faCheckCircle,
  faBan,
  fas,
} from '@fortawesome/free-solid-svg-icons';

import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { NotesService } from '../../../services/notes.service';
import { ViewEditInjectedModel } from '../../../models/Injected/view-edit-injected.model';
import { EditNotesModel } from '../../../models/edit-notes-model';

// export interface NotesDetails{
//   title: string;
//   requestID: string;
//   content: string;
//   createdBy: string;
//   date: Date;
//   lastUpdatedBy: string;
// }

@Component({
  selector: 'cwb-view-edit-notes',
  templateUrl: './view-edit-notes.component.html',
  styleUrls: ['./view-edit-notes.component.scss'],
})
export class ViewEditNotesComponent implements OnInit {
  // icons
  faTrash: IconDefinition = faTrashAlt;
  faEdit: IconDefinition = faPen;
  faCheckCircle: IconDefinition = faCheckCircle;
  faBan: IconDefinition = faBan;
  notesTitle: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  createdByUser: string;
  updatedByUser: string;
  editModeOn: boolean;
  addInvForm: FormGroup;
  isSubmitClicked = false;
  notesDetail: any;

  constructor(
    public dialog: MatDialog,
    private detailsSharing: DetailsSharingService,
    public dialogRef: MatDialogRef<ViewEditNotesComponent>,
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public notesData: ViewEditInjectedModel
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.notesDetail = this.notesData.editdata;
    this.notesTitle = this.notesData.editdata.title;
    this.updatedByUser = this.notesData.editdata.updatedByUser;
    this.description = this.notesData.editdata.description;
    this.createdByUser = this.notesData.editdata.createdByUser;
    this.createdDate = this.notesData.editdata.createdDate;
    this.updatedByUser = this.notesData.editdata.updatedByUser;
    this.updatedDate = this.notesData.editdata.updatedDate;
    this.editMode();
  }

  initializeForm() {
    this.addInvForm = this.formBuilder.group({
      titleControl: new FormControl('', [Validators.required]),
      descriptionControl: new FormControl('', [Validators.required]),
    });
  }

  cancel() {
    if (this.notesData.isEditClicked) {
      this.dialogRef.close();
    } else {
      this.editModeOn = false;
    }
  }

  editMode() {
    if (this.notesData.isEditClicked) {
      this.editModeOn = true;
      this.addInvForm.controls.descriptionControl.setValue(this.description);
      this.addInvForm.controls.titleControl.setValue(this.notesTitle);
    } else {
      this.editModeOn = false;
      this.addInvForm.controls.descriptionControl.setValue(this.description);
      this.addInvForm.controls.titleControl.setValue(this.notesTitle);
    }
  }

  onDeleteNotes() {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to delete this Note ?',
        false,
        'deleteNotes'
      )
      .dialog.subscribe(() => {
        if (this.detailsSharing.alertDialogData.submit) {
          this.deleteNotes(this.notesData.editdata.noteId);
        }
      });
  }

  deleteNotes(noteId: number) {
    this.notesService.deleteNotes(noteId).subscribe((data) => {
      if (data) {
        this.detailsSharing.openSnackBar(
          `Note Deleted Successfully.`,
          'Dismiss',
          false
        );
        this.detailsSharing.reloadNotes.next(true);
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          `Note cannot be deleted.`,
          'Dismiss',
          true
        );
      }
    });
  }

  editNotes() {
    this.editModeOn = true;
  }

  onSubmit(row) {
    this.isSubmitClicked = true;
    if (row.title.length != null) {
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to Update this Note ? ',
          false,
          'addNewNotes'
        )
        .dialog.subscribe((data) => {
          if (this.detailsSharing.alertDialogData.submit) {
            var postData: EditNotesModel = {
              noteId: row.noteId,
              title: row.title,
              description: row.description,
              updatedByUser: 'Dileep',
            };
            this.UpdateNotes(postData);
          }
        });
    } else {
      this.detailsSharing.openSnackBar(
        'Please Fill The Required Fields',
        'Dismiss',
        true
      );
    }
  }

  UpdateNotes(postData: EditNotesModel) {
    this.notesService.UpdateNotes(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Note Updated Successfully',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadNotes.next(true);
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          'An Error Occurred During Updating the Note',
          'Dismiss',
          true
        );
      }
    });
  }
}
