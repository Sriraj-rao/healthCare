import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { InvestigationsService } from '../../services/investigation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { PendCodesModel } from '../../models/pend-codes.model';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { UpdatePendCode } from '../../models/update-claim-pend-code.model';
import { HelperMethods } from '../../helper-methods/helper-methods';
import { EditPendCodeInjectedData } from '../../models/modals-injected-models/edit-pend-code-injected.model';

@Component({
  selector: 'cwb-edit-pend-code',
  templateUrl: './edit-pend-code.component.html',
  styleUrls: ['./edit-pend-code.component.scss'],
})
export class EditPendCodeComponent implements OnInit {
  editForm: FormGroup;
  isSubmitClicked = false;
  pendCodes: PendCodesModel[] = [];
  faSearch = faSearch;
  faTimes = faTimes;
  pendCodeSearchControl = new FormControl();
  helperMethods = new HelperMethods();
  @ViewChild('inputPendCode') pendCodeSearchElement: ElementRef;

  onSelectClicked() {
    setTimeout(() => {
      this.pendCodeSearchElement.nativeElement.focus();
    }, 0);
  }

  constructor(
    private investigationService: AddInvestigationService,
    private invService: InvestigationsService,
    public dialogRef: MatDialogRef<EditPendCodeComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editPendCodeData: EditPendCodeInjectedData,
    private detailsSharing: DetailsSharingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getPendCodes();
  }

  // initializes the form
  initializeForm() {
    this.editForm = this.formBuilder.group({
      pendCodeControl: new FormControl('', [Validators.required]),
    });
  }

  // gets the pend code using service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = response.data;
      }
    });
  }

  // clears the pendcode search
  onClearSearch() {
    this.pendCodeSearchControl.setValue('');
    this.onSelectClicked();
  }

  // resets the pendcode search control
  onPendCodeClosed() {
    this.pendCodeSearchControl.reset();
  }

  // submits the edited pendcode
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.editForm.valid) {
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to edit this pend code ?',
          false,
          'editPendCode'
        )
        .dialog.subscribe((data) => {
          if (this.detailsSharing.alertDialogData.submit) {
            this.updatePendCode();
          }
        });
    } else {
      this.detailsSharing.openSnackBar(
        'Please Select A Pend Code.',
        'Dismiss',
        true
      );
    }
  }
  // updates the pendcode using service call
  updatePendCode() {
    const postData: UpdatePendCode = {
      claimNo: this.editPendCodeData.claimNo,
      pendCode: +this.editForm.controls.pendCodeControl.value.pendCode,
      updatedBy: 'Dileep',
    };
    this.invService.updateClaimPendCode(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Pend Code Updated Succesfully.',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.editPendCodeData.invNumber
        );
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          'Could Not Edit Pend Code.',
          'Dismiss',
          true
        );
      }
    });
  }
}
