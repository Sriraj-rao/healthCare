import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddInvestigationPopupComponent } from 'src/app/shared/Modals/add-investigation-popup/add-investigation-popup.component';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { InvestigationsService } from '../../services/investigation.service';
import { UpdateInvestigationType } from '../../models/update-investigation-type.model';
import { ReopenInvestigationModel } from '../../models/reopen-investigation.model';
import { SubCategoryModel } from '../../models/sub-categories.model';
import { InvestigationCategories } from '../../models/categories.model';
import { PendCodesModel } from '../../models/pend-codes.model';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { EditInvestigationInjectedData } from '../../models/modals-injected-models/edit-investigation-injected.model';
import { HelperMethods } from '../../helper-methods/helper-methods';

@Component({
  selector: 'cwb-edit-investigations-popup',
  templateUrl: './edit-investigations-popup.component.html',
  styleUrls: ['./edit-investigations-popup.component.scss'],
})
export class EditInvestigationsPopupComponent implements OnInit {
  constructor(
    private investigationService: AddInvestigationService,
    private invService: InvestigationsService,
    public dialogRef: MatDialogRef<AddInvestigationPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public editInvestigationData: EditInvestigationInjectedData,
    private detailsSharing: DetailsSharingService
  ) {}
  faSearch = faSearch;
  faTimes = faTimes;
  investigationConditions: SubCategoryModel[] = [];
  investigationCategories: InvestigationCategories[] = [];
  invConditionSearchControl = new FormControl();
  invCategorySearchControl = new FormControl();
  pendCodeSearchControl = new FormControl();
  statusSearchControl = new FormControl();
  pendCodes: PendCodesModel[] = [];
  statusTypes = [];
  categoryId: number;
  addInvForm: FormGroup;
  invNumber = this.editInvestigationData.invNumber;
  invStatus = this.editInvestigationData.invStatus.toUpperCase().trim();
  isClosed: boolean = this.detailsSharing.closedStatuses.includes(
    this.invStatus
  );
  invSubCat = this.editInvestigationData.invType;
  invPendCode = this.editInvestigationData.invPendCode;
  effectiveDate: Date;
  // boolean
  isSubmitClicked = false;
  isPendCodeSelected = false;
  helperMethods = new HelperMethods();

  @ViewChild('inputCondition') conditionSearchElement: ElementRef;
  @ViewChild('inputCategory') categorySearchElement: ElementRef;
  @ViewChild('inputPendCode') pendCodeSearchElement: ElementRef;
  @ViewChild('status') statusSearchElement: ElementRef;

  // boolean isSubmit will become false on selecting the status option
  statusSelection() {
    this.isSubmitClicked = false;
    this.mapPendCodeToStatus();
  }

  ngOnInit(): void {
    this.effectiveDate = new Date();
    this.initializeForm();
    this.getInvestigationConditions();
    this.getInvestigationSubCategoryDetails(
      this.editInvestigationData.catName,
      false
    );
    this.onStatus();
    this.getPendCodes();
  }

  // initializes the form controls
  initializeForm() {
    this.addInvForm = this.formBuilder.group({
      invCategoryControl: new FormControl(
        { value: '', disabled: this.isClosed },
        [Validators.required]
      ),
      invSubCategoryControl: new FormControl(
        { value: '', disabled: this.isClosed },
        [Validators.required]
      ),
      pendCodeControl: new FormControl(this.editInvestigationData.invPendCode, [
        Validators.required,
      ]),
      statusControl: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      updatePendCodeControl: new FormControl(''),
    });
  }

  // closes the sialog
  onCloseDialog() {
    this.dialogRef.close();
  }

  // updates the pendcode
  onPendCodeSelected() {
    if (!this.isClosed) {
      this.isSubmitClicked = false;
      this.isPendCodeSelected = true;
      this.addInvForm.controls.updatePendCodeControl.setValidators([
        Validators.required,
      ]);
      this.addInvForm.controls.updatePendCodeControl.updateValueAndValidity();
    }
  }
  // method to map the pendcode to status
  mapPendCodeToStatus() {
    const statusPendValue =
      this.addInvForm.controls.statusControl.value.pendCode;
    if (statusPendValue && statusPendValue != null) {
      const pendValue = this.pendCodes.find(
        (x) => x.pendCode === statusPendValue
      );
      if (pendValue) {
        const oldValue = this.addInvForm.controls.pendCodeControl.value;
        this.addInvForm.controls.pendCodeControl.patchValue(pendValue);
        if (oldValue.pendCode != pendValue.pendCode) {
          this.onPendCodeSelected();
        }
      } else {
        this.addInvForm.controls.pendCodeControl.reset();
      }
    }
  }

  // clears the pendcode
  onClear() {
    this.isSubmitClicked = false;
    if (this.isClosed) {
      this.addInvForm.controls.pendCodeControl.reset();
    } else {
      this.investigationCategories = [];
      this.addInvForm.reset();
    }
  }

  // gets the investigation conditions from a service call
  getInvestigationConditions() {
    this.investigationService.getAllSubCategories().subscribe((response) => {
      if (response.data != null) {
        for (const x of response.data) {
          if (!this.investigationConditions.some((y) => y.type === x.type)) {
            this.investigationConditions.push(x);
          }
          if (x.subCategoryId === this.editInvestigationData.invConditionId) {
            this.addInvForm.controls.invCategoryControl.patchValue(x);
          }
        }
      }
    });
  }

  // gets the investigation sub category details
  getInvestigationSubCategoryDetails(name: string, change: boolean) {
    this.investigationService
      .getCategoriesByName(name)
      .subscribe((response) => {
        if (response.data != null) {
          this.investigationCategories = response.data;
          let category;
          if (!change) {
            category = this.investigationCategories.find(
              (x) => x.categoryId === this.editInvestigationData.invCatId
            );
          }
          if (change) {
            category = this.investigationCategories[0];
          }
          this.addInvForm.controls.invSubCategoryControl.patchValue(category);
        }
      });
  }

  // gets the status from a service call
  onStatus() {
    this.investigationService.getInvestigationstatus().subscribe((response) => {
      if (response.data != null) {
        this.statusTypes = response.data;
        // this.statusTypes = response.data.filter(x => !(this.detailsSharing.closedStatuses.includes(x.status.toUpperCase().trim())));
        if (!this.isClosed) {
          const status = this.statusTypes.find(
            (x) => x.statusId === this.editInvestigationData.invStatusId
          );
          this.addInvForm.controls.statusControl.patchValue(status);
        }
      }
    });
  }
  // sets the selected investigation sub category details
  onConditionSelected($event) {
    this.getInvestigationSubCategoryDetails(
      this.addInvForm.controls.invCategoryControl.value.type,
      true
    );
  }

  onSelectClicked(i: number) {
    if (i === 1) {
      setTimeout(() => {
        this.conditionSearchElement.nativeElement.focus();
      }, 0);
    }
    if (i === 2) {
      setTimeout(() => {
        this.categorySearchElement.nativeElement.focus();
      }, 0);
    }
    if (i === 3) {
      setTimeout(() => {
        this.pendCodeSearchElement.nativeElement.focus();
      }, 0);
    }
    if (i === 4) {
      setTimeout(() => {
        this.statusSearchElement.nativeElement.focus();
      }, 0);
    }
  }
  // resets the searched values if clear is clicked
  onDropdownClosed(i: number) {
    if (i === 1) {
      this.invConditionSearchControl.reset();
    }
    if (i === 2) {
      this.statusSearchControl.reset();
    }
    if (i === 3) {
      this.invCategorySearchControl.reset();
    }
    if (i === 4) {
      this.pendCodeSearchControl.reset();
    }
  }
  // clears the searched data
  onClearSearch(i: number) {
    if (i === 1) {
      this.invConditionSearchControl.setValue('');
      this.onSelectClicked(1);
    }
    if (i === 2) {
      this.invCategorySearchControl.setValue('');
      this.onSelectClicked(2);
    }
    if (i === 3) {
      this.pendCodeSearchControl.setValue('');
      this.onSelectClicked(3);
    }
    if (i === 4) {
      this.statusSearchControl.setValue('');
      this.onSelectClicked(4);
    }
  }
  // gets the pendcode using a service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = response.data;
        const pend = this.pendCodes.find(
          (x) => x.pendCode === +this.editInvestigationData.invPendCode
        );
        this.addInvForm.controls.pendCodeControl.patchValue(pend);
      }
    });
  }
  // submit functionality to send the updated investigation to the api as post data
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.addInvForm.valid) {
      if (this.isClosed) {
        this.reopenInvestigation();
      } else {
        this.updateInvestigation();
      }
    } else {
      this.detailsSharing.openSnackBar(
        'Please Fill All The Required Fields',
        'Dismiss',
        true
      );
    }
  }
  // method to reopen the close investigation
  reopenInvestigation() {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to reopen Investigation : ' +
          this.editInvestigationData.invNumber +
          ' ?',
        false,
        'reopenInv'
      )
      .dialog.subscribe((data) => {
        if (this.detailsSharing.alertDialogData.submit) {
          const postData: ReopenInvestigationModel = {
            investigationNumber: this.editInvestigationData.invNumber,
            investigationId: this.editInvestigationData.invID,
            statusId: +this.addInvForm.controls.statusControl.value.statusId,
            pendCode: +this.editInvestigationData.invPendCode,
            updatedBy: 'Dileep',
          };
          this.invService
            .reopenInvestigation(postData)
            .subscribe((response) => {
              if (response) {
                this.detailsSharing.openSnackBar(
                  'Investigation Number ' +
                    this.editInvestigationData.invNumber +
                    ' Reopened Succesfully.',
                  'Dismiss',
                  false
                );
                this.detailsSharing.reloadSingleInvestigation.next(
                  this.editInvestigationData.invNumber
                );
                this.dialogRef.close();
              } else {
                this.detailsSharing.openSnackBar(
                  'Could Not Reopen Investigation Number ' +
                    this.editInvestigationData.invNumber +
                    '.',
                  'Dismiss',
                  true
                );
              }
            });
        }
      });
  }
  // gets the updated claim type values
  getUpdateClaimTypeValue() {
    const value = this.addInvForm.controls.updatePendCodeControl.value;
    if (value === 1) {
      return 'ALL';
    }
    if (value === 2) {
      return 'MAIN';
    }
    if (value === 3) {
      return 'NONE';
    }
  }
  // method to send the post data of updated investigation to api
  updateInvestigation() {
    this.detailsSharing
      .openAlertBox(
        'Are you sure you want to update this investigation ?',
        false,
        'updateInv'
      )
      .dialog.subscribe((data) => {
        if (this.detailsSharing.alertDialogData.submit) {
          const postData: UpdateInvestigationType = {
            investigationId: this.editInvestigationData.invID,
            subCategoryId:
              +this.addInvForm.controls.invSubCategoryControl.value
                .subCategoryId,
            updatedBy: 'Dileep',
            statusId: +this.addInvForm.controls.statusControl.value.statusId,
            pendCode: +this.addInvForm.controls.pendCodeControl.value.pendCode,
            claimsType: this.isPendCodeSelected
              ? this.getUpdateClaimTypeValue()
              : 'NONE',
          };
          this.invService
            .updateInvestigationType(postData)
            .subscribe((response) => {
              if (response) {
                this.detailsSharing.openSnackBar(
                  'Investigation Updated Successfully',
                  'Dismiss',
                  false
                );
                this.detailsSharing.reloadSingleInvestigation.next(
                  this.editInvestigationData.invNumber
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
      });
  }
}
