import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faExpandArrowsAlt,
  faTrash,
  faPen,
  faFileMedical,
  faCompressArrowsAlt,
  faFilter,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AddNewNotesPopupComponent } from '../modals/add-new-notes-popup/add-new-notes-popup.component';
import { ViewEditNotesComponent } from '../modals/view-edit-popup/view-edit-notes/view-edit-notes.component';
import { AddNotesModel } from '../models/add-notes.model';
import { NotesModel } from '../models/notes.model';
import { NotesService } from '../services/notes.service';
import { NotesDetailsModel } from 'src/app/shared/models/notes-details.model';
import { StateManagementService } from 'src/app/core/services/state-management.service';

@Component({
  selector: 'cwb-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  faExpandArrowsAlt = faExpandArrowsAlt;
  faCompressArrowsAlt = faCompressArrowsAlt;
  faTrash = faTrashAlt;
  faRedoAlt = faRedoAlt;
  faFileMedical = faFileMedical;
  faPen = faPen;

  faFilter: IconDefinition = faFilter;

  notesDetails: NotesModel[] = [];
  selectedProofOfLoss: Date;
  headerSearchControl: FormControl = new FormControl('');
  isNotesExpanded = false;
  users = ['All Users'];
  selectedusers = 'All Users';
  isInvestigationOrNoteExpanded = false;
  isEditClicked: boolean;
  isSubmitClicked: boolean;
  @Input() isNotesExpandedModel;
  @Input() investigationGroupId: number;
  @Output()
  isNotesExpandedModelChange = new EventEmitter<boolean>();
  addNotesForm: FormGroup;




  constructor(public dialog: MatDialog, private stateMgmt: StateManagementService, private notesService: NotesService,
    private formBuilder: FormBuilder, public detailsSharing: DetailsSharingService,) {
    this.detailsSharing.reloadSingleInvestigation.subscribe((v) => {
      if (v) {
        if (this.investigationGroupId) {
          this.GetNotesByInvestigationGroup();
        }
      }
    });
    this.detailsSharing.reloadNotes.subscribe((v) => {
      if (v) {
        if (this.investigationGroupId) {
          this.GetNotesByInvestigationGroup();
        }
      }
    });
  }

  ngOnInit(): void {
    this.checkPermission();
    this.initializeForm();
    var noteDetails = this.stateMgmt.getNotesDetails();
    if (this.investigationGroupId) {
      if (
        noteDetails != null &&
        noteDetails.investigationGroupId === this.investigationGroupId
      ) {
        this.assignNotesDetails();
      } else {
        this.GetNotesByInvestigationGroup();
      }
    }
  }

  checkPermission()
  {
    if(this.detailsSharing.permissionsCheck.isViewInvestigation && this.detailsSharing.permissionsCheck.isViewNotes)
    {
      this.isNotesExpandedModel = false;
    }
   else if(!this.detailsSharing.permissionsCheck.isViewInvestigation && this.detailsSharing.permissionsCheck.isViewNotes)
   {
     this.isNotesExpandedModel = true;
   }
    
  }
  //assigns the details of the note  to a variable
  assignNotesDetails() {
    const notesDetails = this.stateMgmt.getNotesDetails();
    this.investigationGroupId = notesDetails.investigationGroupId;
    this.notesDetails = notesDetails.notesDetails;
    this.assignFilters();
  }
  // assigns the note details using state management
  assignNotesDetailsOnService() {
    const assignNotesDetails: NotesDetailsModel = {
      investigationGroupId: this.investigationGroupId,
      notesDetails: this.notesDetails,
    };
    this.stateMgmt.setNotesDetails(assignNotesDetails);
  }

  // initializes the form
  initializeForm() {
    this.addNotesForm = this.formBuilder.group({
      titleControl: new FormControl('', [Validators.required]),
      descriptionControl: new FormControl('', [Validators.required]),
    });
  }
  // gets tghe notes by investigation group id using service call
  GetNotesByInvestigationGroup() {
    this.notesService
      .GetNotesByInvestigationGroup(this.investigationGroupId)
      .subscribe((response) => {
        this.notesDetails = response.data;
        this.assignFilters();
        this.assignNotesDetailsOnService();
        this.detailsSharing.reloadNotes.next(false);
      });
  }
  // gets the note by passing id as a parameter using a service call
  getNoteById(noteId: number) {
    this.notesService.getNoteById(noteId).subscribe((response) => {
      if (response.data) {
        const note = response.data;
        this.notesDetails = this.notesDetails.map((obj) =>
          obj.noteId === note.noteId ? note : obj
        );
        this.assignNotesDetailsOnService();
      }
    });
  }

  // assigns the filter values
  assignFilters() {
    this.users = ['All Users'];
    for (const x of this.notesDetails) {
      const i = this.users.findIndex((y) => y === x.createdByUser);
      if (i === -1) {
        this.users.push(x.createdByUser);
      }
      const j = this.users.findIndex((y) => y === x.updatedByUser);
      if (j === -1 && x.updatedByUser.length > 0) {
        this.users.push(x.updatedByUser);
      }
    }
  }
  // expand the notes screen
  onNotesExpand() {
    // this.isNotesExpanded = !this.isNotesExpanded;
    this.isSubmitClicked = false;
    this.initializeForm();
    this.isNotesExpanded = !this.isNotesExpanded;
    this.isNotesExpandedModelChange.emit(!this.isNotesExpandedModel);
    this.isInvestigationOrNoteExpanded = !this.isInvestigationOrNoteExpanded;
  }

  // sets the selected date
  onDateChange($event) {
    this.selectedProofOfLoss = new Date($event);
  }
  onReadMore(row) {
    console.log(row);
    this.isEditClicked = false;
    const noteId = row.noteId;
    this.editNotes(noteId);

    // this.dialog.open(ViewEditNotesComponent);
  }

  // resets the filters
  onResetFilters() {
    this.selectedProofOfLoss = null;
    this.headerSearchControl.setValue('');
    this.selectedusers = 'All Users';
  }
  onEditNotes(row) {
    this.isEditClicked = true;
    this.editNotes(row.noteId);
  }

  // updating the note using a service call
  editNotes(noteId: number) {
    this.notesService.editNotes(noteId).subscribe((data) => {
      if (data) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'cwb-view-edit-notes';
        dialogConfig.data = {
          editdata: data.data,
          isEditClicked: this.isEditClicked,
          isSubmit: false,
          isDeleted: false,
        };
        this.dialog.open(ViewEditNotesComponent, dialogConfig);
      }
    });
  }
  // delete the note
  onDeleteNotes(row) {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to delete this Note ?',
        false,
        'deleteNotes'
      )
      .dialog.subscribe(() => {
        if (this.detailsSharing.alertDialogData.submit) {
          this.deleteNotes(row.noteId);
        }
      });
  }
  // post data to api for deleting the note
  deleteNotes(noteId: number) {
    this.notesService.deleteNotes(noteId).subscribe((data) => {
      if (data) {
        this.detailsSharing.openSnackBar(
          `Note Deleted Successfully.`,
          'Dismiss',
          false
        );
        this.GetNotesByInvestigationGroup();
      } else {
        this.detailsSharing.openSnackBar(
          `Note cannot be deleted.`,
          'Dismiss',
          true
        );
      }
    });
  }
  // opens the popup for adding a note
  addNewNotes() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'cwb-add-new-notes-popup';
    dialogConfig.data = {
      investigationGroupId: this.investigationGroupId,
      newNote: null,
    };
    this.dialog.open(AddNewNotesPopupComponent, dialogConfig);
  }

  // add note functionality in expanded notes screen
  addNewNotesExpanded() {
    this.isSubmitClicked = true;
    if (this.addNotesForm.valid) {
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to add this Note ? ',
          false,
          'addNewNotes'
        )
        .dialog.subscribe((data) => {
          if (this.detailsSharing.alertDialogData.submit) {
            const postData: AddNotesModel = {
              groupId: this.investigationGroupId,
              title: this.addNotesForm.controls.titleControl.value,
              description: this.addNotesForm.controls.descriptionControl.value,
              createdByUser: 'Sriraj',
            };
            this.addNotes(postData);
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
  // post data to api for adding new note using a service call
  addNotes(postData: AddNotesModel) {
    this.notesService.addNotes(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Note Added Successfully',
          'Dismiss',
          false
        );
        this.isSubmitClicked = false;
        this.initializeForm();
        this.GetNotesByInvestigationGroup();
      } else {
        this.detailsSharing.openSnackBar(
          'An Error Occurred During Adding the Note',
          'Dismiss',
          true
        );
      }
    });
  }
}
