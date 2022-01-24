import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { NotesModel } from '../../models/notes.model';
import { NotesService } from '../../services/notes.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faTrash,
  faEdit,
  faPen,
  faCheckCircle,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { EditNotesModel } from '../../models/edit-notes-model';

@Component({
  selector: 'cwb-view-doc-notes',
  templateUrl: './view-doc-notes.component.html',
  styleUrls: ['./view-doc-notes.component.scss'],
})
export class ViewDocNotesComponent implements OnInit {
  constructor(
    private detailsSharing: DetailsSharingService,
    public dialogRef: MatDialogRef<ViewDocNotesComponent>,
    private notesService: NotesService,

    @Inject(MAT_DIALOG_DATA) public docNotesData: any
  ) {}

  notesDetails: NotesModel[] = [];
  // icons
  faTrash: IconDefinition = faTrashAlt;
  faEdit: IconDefinition = faPen;
  faCheckCircle: IconDefinition = faCheckCircle;
  faBan: IconDefinition = faBan;

  isEditClicked = {};
  title: string;
  description: string;
  noteId: number;
  updatedByUser: string;

  ngOnInit(): void {
    this.getDocNotes();
  }

  getDocNotes() {
    this.notesService
      .getDocNotes(
        this.docNotesData.investigationGroupId,
        this.docNotesData.requestId,
        this.docNotesData.investigationId
      )
      .subscribe((response) => {
        if (response) {
          this.notesDetails = response.data;
          if (this.notesDetails.length === 0) {
            this.dialogRef.close();
          }
        }
      });
  }
  // method to update the selcted note
  update(row, rowIndex) {
    this.title = row.title;
    this.description = row.description;
    this.noteId = row.noteId;
    this.updatedByUser = row.updatedByUser;
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to Update this Note ? ',
        false,
        'addNewNotes'
      )
      .dialog.subscribe((data) => {
        if (this.detailsSharing.alertDialogData.submit) {
          this.isEditClicked[rowIndex] = !this.isEditClicked[rowIndex];
          const postData: EditNotesModel = {
            noteId: this.noteId,
            title: this.title,
            description: this.description,
            updatedByUser: 'Dileep',
          };
          this.UpdateNotes(postData, row.noteId);
        }
      });
  }

  onClose() {
    this.getDocNotes();
  }

  UpdateNotes(postData: EditNotesModel, noteId: number) {
    this.notesService.UpdateNotes(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Note Updated Successfully',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadNotes.next(true);
      } else {
        this.detailsSharing.openSnackBar(
          'An Error Occurred During Updating the Note',
          'Dismiss',
          true
        );
      }
    });
  }

  // method to delete the notes
  onDeleteNotes(row, rowIndex) {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to delete this Note ?',
        false,
        'deleteNotes'
      )
      .dialog.subscribe(() => {
        if (this.detailsSharing.alertDialogData.submit) {
          this.deleteNotes(row.noteId, row);
        }
      });
  }
  // method to delete the note using a service call
  deleteNotes(noteId: number, row: any) {
    this.notesService.deleteNotes(noteId).subscribe((data) => {
      if (data) {
        this.detailsSharing.openSnackBar(
          `Note Deleted Successfully.`,
          'Dismiss',
          false
        );
        this.detailsSharing.reloadNotes.next(true);
        this.getDocNotes();
      } else {
        this.detailsSharing.openSnackBar(
          `Note cannot be deleted.`,
          'Dismiss',
          true
        );
      }
    });
  }
}
