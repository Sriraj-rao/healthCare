import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AddNotesModel } from '../../models/add-notes.model';
import { AddDocNotesModel } from '../../models/doc-notes.model';
import { NotesService } from '../../services/notes.service';
import { NotesModel } from '../../models/notes.model';
import { AddNewNotesInjected } from '../../models/Injected/add-new-injected.model';
import { AddNewNotesDocInjected } from '../../models/Injected/add-new-doc-injected.model';
import { CHARACTER_PATTERN } from 'src/app/investigations/helper-methods/helper-methods';

@Component({
  selector: 'cwb-add-new-notes-popup',
  templateUrl: './add-new-notes-popup.component.html',
  styleUrls: ['./add-new-notes-popup.component.scss'],
})
export class AddNewNotesPopupComponent implements OnInit {
  constructor(
    private detailsSharing: DetailsSharingService,
    public dialogRef: MatDialogRef<AddNewNotesPopupComponent>,
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public notesData: AddNewNotesInjected
  ) {}
  addInvForm: FormGroup;
  isSubmitClicked = false;

  ngOnInit(): void {
    this.initializeForm();
  }
  // initializes the form and form controls
  initializeForm() {
    this.addInvForm = this.formBuilder.group({
      titleControl: new FormControl('', [
        Validators.required,
        Validators.pattern(CHARACTER_PATTERN),
      ]),
      descriptionControl: new FormControl('', [
        Validators.required,
        Validators.pattern(CHARACTER_PATTERN),
      ]),
    });
  }
  // submit functionality to add note
  onSubmit() {
    this.isSubmitClicked = true;
    if (
      this.notesData.requestId !== null &&
      this.notesData.requestId !== undefined
    ) {
      if (this.addInvForm.valid) {
        this.detailsSharing
          .openAlertBox(
            'Are you sure you want to add this note ? ',
            false,
            'addNewNotes'
          )
          .dialog.subscribe((data) => {
            if (this.detailsSharing.alertDialogData.submit) {
              var postData: AddDocNotesModel = {
                investigationId: this.notesData.investigationId,
                requestId: this.notesData.requestId,
                groupId: this.notesData.investigationGroupId,
                title: this.addInvForm.controls['titleControl'].value,
                description:
                  this.addInvForm.controls['descriptionControl'].value,
              };
              this.addDocNotes(postData);
            }
          });
      } else {
        this.detailsSharing.openSnackBar(
          'Please Fill The Required Fields',
          'Dismiss',
          true
        );
      }
    } else {
      if (this.addInvForm.valid) {
        this.detailsSharing
          .openAlertBox(
            'Are you sure you want to add this Note ? ',
            false,
            'addNewNotes'
          )
          .dialog.subscribe((data) => {
            if (this.detailsSharing.alertDialogData.submit) {
              const postData: AddNotesModel = {
                groupId: this.notesData.investigationGroupId,
                title: this.addInvForm.controls.titleControl.value,
                description: this.addInvForm.controls.descriptionControl.value,
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
  }

  addDocNotes(postData: AddDocNotesModel) {
    this.notesService.addDocNotes(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Note Added Successfully',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.notesData.investigationNumber
        );
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          'An Error Occurred During Adding the Note',
          'Dismiss',
          true
        );
      }
    });
  }

  addNotes(postData: AddNotesModel) {
    this.notesService.addNotes(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Note Added Successfully',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadNotes.next(true);
        this.dialogRef.close();
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
