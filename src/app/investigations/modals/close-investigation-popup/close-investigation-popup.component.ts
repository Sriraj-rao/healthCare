import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { InvestigationsService } from '../../services/investigation.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CloseInvestigationModel } from '../../models/close-investigation.model';
import { MatSort } from '@angular/material/sort';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentTypes } from '../../models/payment-types.model';
import { PendCodesModel } from '../../models/pend-codes.model';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import {
  IconDefinition,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
  HelperMethods,
  CHARACTER_PATTERN,
} from '../../helper-methods/helper-methods';
import { CloseInvestigationInjectedData } from '../../models/modals-injected-models/close-inv-injected.model';

@Component({
  selector: 'cwb-close-investigation-popup',
  templateUrl: './close-investigation-popup.component.html',
  styleUrls: ['./close-investigation-popup.component.scss'],
})
export class CloseInvestigationPopupComponent implements OnInit {
  faSearch: IconDefinition = faSearch;
  faTimes = faTimes;
  faCalendarAlt = faCalendarAlt;
  investigationId = this.closeInvPopupData.investigationId;
  investigationDecisions: any[] = [];
  payAs: PaymentTypes[];
  allCheckboxSelected: boolean = false;
  private sort: MatSort;
  pendCodeSearchControl = new FormArray([]);
  pendCodeHeaderControl = new FormControl();
  pendCodes: PendCodesModel[] = [];
  disableHeaderSelect: boolean = true;
  disableSelect: boolean[] = [];
  closeInvForm: FormGroup;
  isSubmitClicked: boolean;
  claimsDetails: Claim[] = [];
  dataSource: MatTableDataSource<Claim>;
  helperMethods = new HelperMethods();
  headerAndControlMapping: { header: string; control: string }[];

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  constructor(
    private investigationService: AddInvestigationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CloseInvestigationPopupComponent>,
    public detailsSharing: DetailsSharingService,
    @Inject(MAT_DIALOG_DATA)
    public closeInvPopupData: CloseInvestigationInjectedData,
    private invService: InvestigationsService
  ) {}

  displayedColumns: string[] = [
    'checkbox',
    'claimNum',
    'diagnosis',
    'claimDate',
    'pendCode',
    'finalDiscussion',
    'proofOfLoss',
    'payAs',
  ];

  @ViewChild('inputPendCode') pendCodeSearchElements: ElementRef;
  @ViewChildren('inputChildPendCode') myValue: QueryList<ElementRef>;

  ngOnInit(): void {
    this.initializeForm();
    this.setCommentsValidators();
    this.getPendCodes();
    this.getPaymentTypes();
  }

  // initializes the form
  initializeForm() {
    this.closeInvForm = this.formBuilder.group({
      pendCodeHeader: new FormControl(''),
      finalDecisionHeader: new FormControl(''),
      proofOfLossHeader: new FormControl(''),
      payAsHeader: new FormControl(''),
      pendCodeControl: new FormArray([]),
      finalDecisionControl: new FormArray([]),
      proofOfLossControl: new FormArray([]),
      payAsControl: new FormArray([]),
      commentsControl: new FormControl('', [
        Validators.required,
        Validators.pattern(CHARACTER_PATTERN),
      ]),
    });
    this.headerAndControlMapping = [
      {
        header: 'pendCodeHeader',
        control: 'pendCodeControl',
      },
      {
        header: 'finalDecisionHeader',
        control: 'finalDecisionControl',
      },
      {
        header: 'proofOfLossHeader',
        control: 'proofOfLossControl',
      },
      {
        header: 'payAsHeader',
        control: 'payAsControl',
      },
    ];
  }
//setting validation for comments form control
  setCommentsValidators() {
    const commentsControl = this.closeInvForm.get('commentsControl');
    if(this.detailsSharing.permissionsCheck.isAddNotes)
    {
      commentsControl.setValidators([Validators.required,Validators.pattern(CHARACTER_PATTERN)]);
    }
    else{
      commentsControl.setValidators(null);
    }
  

    commentsControl.updateValueAndValidity();
     
      
  }
  //gets the form array
  getAsFormArray(controlName: string) {
    return this.closeInvForm.get(controlName) as FormArray;
  }

  // gets the claims by investigation id using service call
  getClaimsByInvId() {
    this.invService
      .getClaimsAttached(this.investigationId, true)
      .subscribe((response) => {
        if (response.data) {
          // this.claimsDetails = response.data.filter(x => x.status.toUpperCase() === 'I' && x.decision === 'Open'
          this.claimsDetails = response.data;
          this.dataSource = new MatTableDataSource(this.claimsDetails);
          let count = 0;
          for (const x of this.claimsDetails) {
            x.isCheckboxClicked = false;
            x.index = count;
            this.pendCodeSearchControl.push(new FormControl(''));
            this.getAsFormArray('proofOfLossControl').push(
              new FormControl({ value: '', disabled: true })
            );
            this.getAsFormArray('payAsControl').push(
              new FormControl({ value: '', disabled: true })
            );
            // if (x.decision != 'Close' && x.decision != 'Open') {
            const decision = this.investigationDecisions.find(
              (y) => y.status === x.decision
            );
            if (decision) {
              this.getAsFormArray('finalDecisionControl').push(
                new FormControl({ value: decision, disabled: true })
              );
            } else {
              this.getAsFormArray('finalDecisionControl').push(
                new FormControl({ value: '', disabled: true })
              );
            }
            // }
            // if (x.decision === 'Open') {
            //   this.getAsFormArray('finalDecisionControl').push(new FormControl({ value: '', disabled: true }));
            // }
            const pend = this.pendCodes.find((z) => z.pendCode === x.pendCode);
            if (pend) {
              this.getAsFormArray('pendCodeControl').push(
                new FormControl({ value: pend, disabled: true })
              );
            } else {
              this.getAsFormArray('pendCodeControl').push(
                new FormControl({ value: '', disabled: true })
              );
            }
            this.disableSelect.push(true);
            x.isDisabled = true;
            count = count + 1;
          }
          console.log(this.closeInvForm.controls);
          console.log(this.claimsDetails);
        }
      });
  }

  // gets the investigation decisions
  getInvestigationDecisions() {
    this.investigationDecisions = [];
    this.invService.getInvestigationDecisions().subscribe((response) => {
      if (response.data) {
        this.investigationDecisions = response.data.filter(
          (x) => x.status != 'Open'
        );
        this.getClaimsByInvId();
      }
    });
  }

  // gets the payment types using service call
  getPaymentTypes() {
    this.invService.getAllPaymentTypes().subscribe((response) => {
      if (response.data) {
        this.payAs = response.data;
      }
    });
  }

  // clears the search of pendcode
  onClearDropdownSearch(i: number) {
    this.pendCodeSearchControl.controls[i].setValue('');
    this.onChildPendCodeClicked(i);
  }

  // gets the pendcode using service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = [];
        this.pendCodes = response.data;
      }
      this.getInvestigationDecisions();
    });
  }

  // sets the particular values that has been changed in the header
  onHeaderChanged(value, i: number) {
    this.assignHeaderValueToAllControls(
      value,
      this.headerAndControlMapping[i - 1].control
    );
  }

  // assigning the header values to all the controls
  assignHeaderValueToAllControls(value, controlName: string) {
    for (const x in this.getAsFormArray(controlName).controls) {
      if (this.claimsDetails[x].isCheckboxClicked) {
        this.getAsFormArray(controlName).controls[x].setValue(value);
      }
    }
  }
  onOptionSelected() {
    this.isSubmitClicked = false;
  }

  // gives the alert message if no claim is selected
  onSelectClicked() {
    if (HelperMethods.isHeaderSelectDisabled(this.claimsDetails)) {
      this.detailsSharing.openSnackBar(
        `Please Select an Attached Claim.`,
        'Dismiss',
        true
      );
    } else {
      setTimeout(() => {
        this.pendCodeSearchElements.nativeElement.focus();
      }, 0);
    }
  }

  // resets the header control fields
  onPendCodeHeaderClosed() {
    this.pendCodeHeaderControl.reset();
  }

  // resets the single pend code
  onPendCodeChildClosed(i: number) {
    this.pendCodeSearchControl.controls[i].reset();
  }

  // clears the header search fields
  onClearHeaderSearch() {
    this.pendCodeHeaderControl.setValue('');
    this.onSelectClicked();
  }

  // condition for enabling or disabling the pendcode field
  onChildPendCodeClicked(i: number) {
    if (this.claimsDetails[i].isDisabled === true) {
      return;
    } else {
      setTimeout(() => {
        this.myValue.toArray()[i].nativeElement.focus();
      }, 0);
    }
  }

  // condition for header fields if the claims are not selected
  onHeaderSelectClicked() {
    if (HelperMethods.isHeaderSelectDisabled(this.claimsDetails)) {
      this.detailsSharing.openSnackBar(
        `Please Select an Attached Claim.`,
        'Dismiss',
        true
      );
    }
  }

  // enabling or disabling the formcontrols fields based on the claims selected
  enableSelectedControls() {
    for (const i in this.claimsDetails) {
      if (this.claimsDetails[i].isCheckboxClicked === true) {
        this.headerAndControlMapping.forEach((x) =>
          this.getAsFormArray(x.control).controls[i].enable()
        );
      } else {
        this.headerAndControlMapping.forEach((x) =>
          this.getAsFormArray(x.control).controls[i].disable()
        );
      }
    }
  }

  // method to check all the checkbox
  checkAllCheckboxClicked(): boolean {
    const index = this.claimsDetails.findIndex(
      (x) => x.isCheckboxClicked === false
    );
    if (index === -1) {
      return true;
    } else {
      return false;
    }
  }
  // this method will execte when the individual checkbox is selected
  onCheckboxChanged(i) {
    this.claimsDetails[i].isCheckboxClicked =
      !this.claimsDetails[i].isCheckboxClicked;
    this.claimsDetails[i].isDisabled = !this.claimsDetails[i].isCheckboxClicked;
    this.disableHeaderSelect = HelperMethods.isHeaderSelectDisabled(
      this.claimsDetails
    );
    if (this.claimsDetails[i].isCheckboxClicked === true) {
      this.headerAndControlMapping.forEach((x) => {
        if (this.closeInvForm.controls[x.header].value) {
          this.getAsFormArray(x.control).controls[i].setValue(
            this.closeInvForm.controls[x.header].value
          );
        }
      });
    }
    this.enableSelectedControls();
  }

  // enabling the formcontrols when the checkbox is checked
  onAllCheckboxChanged() {
    this.allCheckboxSelected = !this.allCheckboxSelected;
    this.claimsDetails = this.claimsDetails.map((x) => {
      x.isCheckboxClicked = this.allCheckboxSelected;
      x.isDisabled = !this.allCheckboxSelected;
      return x;
    });
    this.disableHeaderSelect = HelperMethods.isHeaderSelectDisabled(
      this.claimsDetails
    );
    if (this.allCheckboxSelected === true) {
      this.headerAndControlMapping.forEach((x) => {
        if (this.closeInvForm.controls[x.header].value) {
          this.assignHeaderValueToAllControls(
            this.closeInvForm.controls[x.header].value,
            x.control
          );
        }
      });
    }
    this.enableSelectedControls();
  }

  // adding validators for the mandatory fields
  markRequiredFields() {
    for (const i in this.claimsDetails) {
      if (this.claimsDetails[i].isCheckboxClicked) {
        this.headerAndControlMapping.forEach((x) => {
          this.getAsFormArray(x.control).controls[i].setValidators([
            Validators.required,
          ]);
          this.getAsFormArray(x.control).controls[i].updateValueAndValidity();
        });
      } else {
        this.headerAndControlMapping.forEach((x) => {
          this.getAsFormArray(x.control).controls[i].clearValidators();
          this.getAsFormArray(x.control).controls[i].updateValueAndValidity();
        });
      }
    }
  }

  // submitting all formcontrol values to close the investigation
  onSubmit() {
    this.isSubmitClicked = true;
    this.markRequiredFields();
    if (this.closeInvForm.valid) {
      const rowsToSend: CloseInvestigationModel[] = [];
      for (const i in this.claimsDetails) {
        if (this.claimsDetails[i].isCheckboxClicked) {
          rowsToSend.push({
            investigationId: this.investigationId,
            claimNum: this.claimsDetails[i].claimNum,
            decisionId: this.getAsFormArray('finalDecisionControl').controls[i]
              .value.decisionId,
            paymentId:
              +this.getAsFormArray('payAsControl').controls[i].value.paymentId,
            pendCode:
              +this.getAsFormArray('pendCodeControl').controls[i].value
                .pendCode,
            proofOfLoss:
              this.getAsFormArray('proofOfLossControl').controls[i].value,
            comment: this.closeInvForm.controls.commentsControl.value,
            updatedByUser: 'Alex',
          });
        }
      }
      if (rowsToSend.length === 0) {
        this.detailsSharing.openSnackBar(
          `Please Select an Attached Claim.`,
          'Dismiss',
          true
        );
      } else {
        let confirmText: string;
        if (rowsToSend.length === 1) {
          confirmText =
            'Are you sure you want to change claim decision for claim number: ' +
            rowsToSend[0].claimNum +
            ' ?';
        } else {
          confirmText =
            'Are you sure you want to change claim decision for all these claims ?';
        }
        this.detailsSharing
          .openAlertBox(confirmText, false, 'closeInv')
          .dialog.subscribe((data) => {
            if (this.detailsSharing.alertDialogData.submit) {
              this.submitClaimsAttached(rowsToSend);
            }
          });
      }
    } else {
      this.detailsSharing.openSnackBar(
        `Please Select All Options.`,
        'Dismiss',
        true
      );
    }
  }

  // calling service call for submit functionality
  submitClaimsAttached(rowsToSend: CloseInvestigationModel[]) {
    this.invService.closeClaims(rowsToSend).subscribe((response) => {
      if (response) {
        this.detailsSharing.openSnackBar(
          `Investigation Closed Successfully.`,
          'Dismiss',
          false
        );
        this.detailsSharing.reloadSingleInvestigation.next(
          this.closeInvPopupData.investigationNumber
        );
        this.dialogRef.close();
      }
    });
  }
}
