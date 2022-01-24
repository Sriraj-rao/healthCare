import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { AddInvestigationPopupComponent } from 'src/app/shared/Modals/add-investigation-popup/add-investigation-popup.component';
import { AddInvestigationService } from 'src/app/shared/Modals/services/add-investigation.service';
import { ViewClaimsDetailsPopupComponent } from 'src/app/shared/Modals/view-claims-details-popup/view-claims-details-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvestigationsModule } from '../../investigations.module';
import { InvestigationModel } from '../../models/investigation.model';
import { InvestigationsService } from '../../services/investigation.service';
import { NgForm } from '@angular/forms';

import { EditInvestigationsPopupComponent } from './edit-investigations-popup.component';
const mockdocResults = {
  data: [],
  isSuccess: true,
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private testParamss: {};
  get testParams() {
    return this.testParamss;
  }
  set testParams(params: {}) {
    this.testParamss = params;
    this.subject.next(params);
  }
}

fdescribe('EditInvestigationsPopupComponent', () => {
  let component: EditInvestigationsPopupComponent;
  let fixture: ComponentFixture<EditInvestigationsPopupComponent>;
  let testBedInvestigationsService: InvestigationsService;
  let testBedDetailSharingService: DetailsSharingService;
  let testBedAddInvestigationsService: AddInvestigationService;
  const mockdocs = mockdocResults;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInvestigationsPopupComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        // TextFieldModule,
        // MatSelectModule,
        // MatTableModule,
        InvestigationsModule,
        // SharedModule
      ],

      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvestigationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedDetailSharingService = TestBed.get(DetailsSharingService);
    testBedInvestigationsService = TestBed.get(InvestigationsService);
    testBedAddInvestigationsService = TestBed.get(AddInvestigationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
