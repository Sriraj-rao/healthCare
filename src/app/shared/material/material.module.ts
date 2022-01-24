import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { AddInvestigationPopupComponent } from '../Modals/add-investigation-popup/add-investigation-popup.component';
import { ViewClaimsDetailsPopupComponent } from '../Modals/view-claims-details-popup/view-claims-details-popup.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';


const modules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  OverlayModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  entryComponents: []
})
export class MaterialModule { }
