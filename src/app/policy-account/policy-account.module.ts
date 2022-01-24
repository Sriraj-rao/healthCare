import { NgModule } from '@angular/core';
import { InsuredComponent } from './insured/insured.component';
import { ClaimsComponent } from './claims/claims.component';
import { ClaimsSubTableComponent } from './claims/claims-sub-table/claims-sub-table.component';
import { InsuredDetailsComponent } from './insured/insured-details/insured-details.component';
import { InsuredSubTableComponent } from './insured/insured-sub-table/insured-sub-table.component';
import { PolicyAccountComponent } from './policy-account.component';
import { ClaimsDetailsComponent } from './claims/claims-details/claims-details.component';
import { InvestigationsTabComponent } from './investigations-tab/investigations-tab.component';
import { NotificationsComponent } from './modals/notifications/notifications.component';
import { MiscInfoComponent } from './claims/modals/misc-info/misc-info.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    InsuredComponent,
    ClaimsComponent,
    ClaimsSubTableComponent,
    InsuredDetailsComponent,
    InsuredSubTableComponent,
    PolicyAccountComponent,
    ClaimsDetailsComponent,
    InvestigationsTabComponent,
    NotificationsComponent,
    MiscInfoComponent
  ],
  imports: [
    PolicyRoutingModule,
    SharedModule
  ],
  exports: [
    InsuredComponent,
    ClaimsComponent,
    ClaimsSubTableComponent,
    InsuredDetailsComponent,
    InsuredSubTableComponent,
    PolicyAccountComponent,
    ClaimsDetailsComponent,
    InvestigationsTabComponent
  ]
})
export class PolicyAccountModule { }
