import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { PendCodesModel } from 'src/app/investigations/models/pend-codes.model';
import { AddInvestigationService } from '../../../shared/Modals/services/add-investigation.service';
import { ReopenClaim } from '../../models/reopen.model';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HelperMethods } from '../../helper-methods/helper-methods';
import { ReopenInvestigationInjectedData } from '../../models/modals-injected-models/reopen-injected.model';

@Component({
  selector: 'cwb-reopen-popup',
  templateUrl: './reopen-popup.component.html',
  styleUrls: ['./reopen-popup.component.scss'],
})
export class ReopenPopupComponent implements OnInit {
  constructor(
    private investigationService: AddInvestigationService,
    private formBuilder: FormBuilder,
    private detailsSharing: DetailsSharingService,
    public dialogRef: MatDialogRef<ReopenPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public reopenData: ReopenInvestigationInjectedData
  ) {}
  // icons
  faSearch = faSearch;
  faTimes = faTimes;

  pendCodes: PendCodesModel[] = [];
  addInvForm: FormGroup;
  pendCode = this.reopenData.pendCode;
  claimNum = this.reopenData.claimNum;
  isSubmitClicked = false;
  pendCodeSearchControl = new FormControl();
  helperMethods = new HelperMethods();

  @ViewChild('inputPendCode') pendCodeSearchElement: ElementRef;

  ngOnInit(): void {
    this.getPendCodes();
    this.initializeForm();
  }

  // initializes the form
  initializeForm() {
    this.addInvForm = this.formBuilder.group({
      pendCodeControl: new FormControl('', [Validators.required]),
    });
  }
  // resets the pendcode
  onPendCodeClosed() {
    this.pendCodeSearchControl.reset();
  }
  // sets the pendcode based on the selected event
  statusSelection(event) {
    this.pendCode = event.pendCode;
    this.isSubmitClicked = false;
  }

  // closes the dialog
  onCloseDialog() {
    this.dialogRef.close();
  }

  // gets the pendcode using service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = [];
        for (const x of response.data) {
          this.pendCodes.push(x);
          if (x.pendCode === +this.reopenData.pendCode) {
            this.addInvForm.controls.pendCodeControl.patchValue(x);
          }
        }
      }
    });
  }

  // focus the pendcode search element
  onSelectClicked() {
    setTimeout(() => {
      this.pendCodeSearchElement.nativeElement.focus();
    }, 0);
  }

  // clears the pendcode search
  onClearSearch() {
    this.pendCodeSearchControl.setValue('');
    this.onSelectClicked();
  }

  // submits the reopen details
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.addInvForm.valid) {
      this.detailsSharing
        .openAlertBox('Are you sure you want to submit ', false, 'reopen')
        .dialog.subscribe((data) => {
          if (this.detailsSharing.alertDialogData.submit) {
            const postData: ReopenClaim = {
              claimNo: this.claimNum,
              updatedBy: 'Dileep',
              investigationNumber: this.reopenData.investigationNumber,
              investigationId: this.reopenData.investigationId,
              pendCode:
                +this.addInvForm.controls.pendCodeControl.value.pendCode,
            };
            this.reopenRequest(postData);
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
  // submits the reopen post data using post request
  reopenRequest(postData: ReopenClaim) {
    this.investigationService.reopenClaim(postData).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          'Reopen Claim is Successful',
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.reopenData.investigationNumber
        );
        this.dialogRef.close();
      } else {
        this.detailsSharing.openSnackBar(
          'An Error Occurred During Your Request',
          'Dismiss',
          true
        );
      }
    });
  }
  // clears the form
  onClear() {
    this.isSubmitClicked = false;
    this.addInvForm.reset();
  }
}
