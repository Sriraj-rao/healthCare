import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddInvestigationService } from '../services/add-investigation.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AddInvestigation } from '../Models/add-investigation.model';
import { Router } from '@angular/router';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { SubCategoryModel } from 'src/app/investigations/models/sub-categories.model';
import { InvestigationCategories } from 'src/app/investigations/models/categories.model';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PendCodesModel } from 'src/app/investigations/models/pend-codes.model';
import { StateManagementService } from 'src/app/core/services/state-management.service';
import { AddInvInjectedData } from '../Models/Injected/add-inv-injected.model';
import { HelperMethods } from 'src/app/investigations/helper-methods/helper-methods';

@Component({
  selector: 'cwb-add-investigation-popup',
  templateUrl: './add-investigation-popup.component.html',
  styleUrls: ['./add-investigation-popup.component.scss'],
})
export class AddInvestigationPopupComponent implements OnInit {
  constructor(
    private investigationService: AddInvestigationService,
    private stateMgmt: StateManagementService,
    public dialogRef: MatDialogRef<AddInvestigationPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public claimsData: AddInvInjectedData,
    private router: Router,
    private detailsSharing: DetailsSharingService
  ) { }

  investigationConditions: SubCategoryModel[] = [];
  investigationCategories: InvestigationCategories[] = [];
  pendCodes: PendCodesModel[] = [];
  // icons
  faSearch = faSearch;
  faTimes = faTimes;

  statusTypes = [];
  selected: 'select';
  categoryId: number;
  addInvForm: FormGroup;
  invConditionSearchControl = new FormControl();
  invCategorySearchControl = new FormControl();
  pendCodeSearchControl = new FormControl();
  statusSearchControl = new FormControl();
  claimantName = this.claimsData.claimantName;
  onInvestigations = this.claimsData.onInvestigations;
  // boolean
  investigationType = false;
  categorySelected = false;
  statusValue = false;
  isSubmitClicked = false;

  effectiveDate: Date;
  helperMethods = new HelperMethods();

  @ViewChild('inputCondition') conditionSearchElement: ElementRef;
  @ViewChild('inputCategory') categorySearchElement: ElementRef;
  @ViewChild('inputPendCode') pendCodeSearchElement: ElementRef;
  @ViewChild('status') statusSearchElement: ElementRef;

  // gets the focus on the selected element
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
  // sets the invSubCategoryControl value of the form to null
  onCatSelected(value: SubCategoryModel) {
    this.isSubmitClicked = false;
    this.categorySelected = true;
    this.categoryId = value.categoryId;
    this.addInvForm.controls.invSubCategoryControl.setValue(null);
    this.getInvestigationSubCategoryDetails(value.type);
  }
  // resets the search values when its closed
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

  // sets the following boolen to their respective values when the subcategory is selected
  onSubCatSelected() {
    this.isSubmitClicked = false;
    this.investigationType = true;
    this.onStatus();
  }
// executes this method when the pendcode is selected
  onPendSelected(){
    this.isSubmitClicked = false;
    this.investigationType = true;
  }

  // enables the pendcode field after the staus selection
  statusSelection(value: any) {
    this.statusValue = true;
    this.isSubmitClicked = false;
    if (this.pendCodes.length === 0){
      this.getPendCodes();
    }
    else{
      this.mapPendCodeToStatus();
    }
  }

  ngOnInit(): void {
    this.effectiveDate = new Date();
    this.initializeForm();
    this.getInvestigationConditions();
  }
// initializes the form
  initializeForm() {
    this.addInvForm = this.formBuilder.group({
      invCategoryControl: new FormControl('', [Validators.required]),
      invSubCategoryControl: new FormControl('', [Validators.required]),
      pendCodeControl: new FormControl('', [Validators.required]),
      statusControl: new FormControl('', [Validators.required]),
    });
  }
// maps the pendcode to status
  mapPendCodeToStatus(){
    const statusPendValue = this.addInvForm.controls.statusControl.value.pendCode;
    if (statusPendValue && statusPendValue != null){
          const pendValue = this.pendCodes.find(x => x.pendCode === statusPendValue);
          if (pendValue){
            this.addInvForm.controls.pendCodeControl.patchValue(pendValue);
            this.onPendSelected();
          }
          else{
            this.addInvForm.controls.pendCodeControl.reset();
          }
        }
  }
  // closes the dialog
  onCloseDialog() {
    this.dialogRef.close();
  }
  // clears the form
  onClear() {
    this.isSubmitClicked = false;
    this.investigationType = false;
    this.categorySelected = false;
    this.statusValue = false;
    this.addInvForm.reset();
  }
// gets the investigation conditions using a service call
  getInvestigationConditions() {
    this.investigationService.getAllSubCategories().subscribe((response) => {
      if (response.data != null) {
        for (const x of response.data) {
          if (!this.investigationConditions.some((y) => y.type === x.type)) {
            this.investigationConditions.push(x);
          }
        }
      }
    });
  }
  // gets theinvestigation sub category detailsusing a service call
  getInvestigationSubCategoryDetails(value: string) {
    this.investigationService
      .getCategoriesByName(value)
      .subscribe((response) => {
        if (response.data != null) {
          this.investigationCategories = response.data;
          if (this.investigationCategories.length === 1) {
            this.addInvForm.controls.invSubCategoryControl.patchValue(
              this.investigationCategories[0]
            );
            this.onSubCatSelected();
          }
        }
      });
  }

  // gets the investigation status using a service call
  onStatus() {
    this.investigationService.getInvestigationstatus().subscribe((response) => {
      if (response.data != null) {
        this.statusTypes = response.data.filter(
          (x) => !(x.status.includes('Reopen') || x.status.includes('ReOpen'))
        );
      }
    });
  }
  // clears the seearched values
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

  // gets the pendcode using service call
  getPendCodes() {
    this.investigationService.getAllPendCodes().subscribe((response) => {
      if (response.data != null) {
        this.pendCodes = response.data;
        this.mapPendCodeToStatus();
      }
    });
  }
  // submit functionality to add a new investigation
  onSubmit() {
    this.isSubmitClicked = true;
    if (this.addInvForm.valid) {
      this.detailsSharing
        .openAlertBox(
          'Are you sure you want to add new investigation for ' +
          this.claimantName +
          ' in investigation type : ' +
          this.addInvForm.controls.invSubCategoryControl.value.type +
          ' ?',
          false,
          'addInv'
        )
        .dialog.subscribe((data) => {
          if (this.detailsSharing.alertDialogData.submit) {
            const postData: AddInvestigation = {
              subCategoryId:
                +this.addInvForm.controls.invSubCategoryControl.value
                  .subCategoryId,
              claimNum: this.claimsData.claimNumber,
              // createdBy: 'Dileep',
              statusId:
                +this.addInvForm.controls.statusControl.value.statusId,
              pendCode:
                +this.addInvForm.controls.pendCodeControl.value.pendCode,
            };
            this.createNewInvestigation(postData);
          }
        });
    } else {
      this.detailsSharing.openSnackBar(
        'Please Fill All The Required Fields',
        'Dismiss',
        true
      );
    }
  }
  // creates an object that has to be sent as a post data t api
  createNewInvestigation(postData: AddInvestigation) {
    this.investigationService
      .createNewInvestigation(postData)
      .subscribe((response) => {
        if (response) {
          this.detailsSharing.openSnackBar(
            'Investigation Added Successfully',
            'Dismiss',
            false
          );
          this.stateMgmt.setClaimDetails({...this.stateMgmt.getClaimDetails(), isNewInvAdded: true});
          if (!this.onInvestigations) {
            this.detailsSharing.invForRoute.next({
              name: this.claimsData.claimNumber,
              query: 'invId',
              value: false,
            });
            this.stateMgmt.setInvestigationDetails(null);
            this.detailsSharing.invName = this.claimsData.claimantName;
            this.detailsSharing.invClaimNumber = this.claimsData.claimNumber;
            this.router.navigate(
              ['investigations', this.claimsData.claimNumber],
              {
                queryParams: {
                  invId: false,
                },
              }
            );
          } else {
            this.detailsSharing.addNewlyCreatedInvestigation.next(
              response.data
            );
          }
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
}
