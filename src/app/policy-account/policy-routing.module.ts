import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyAccountComponent } from './policy-account.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyAccountComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
