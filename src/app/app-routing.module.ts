import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PolicyAccountComponent } from './policy-account/policy-account.component';
import { InvestigationFormComponent } from './investigation-form/investigation-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CanActivateGuard } from './core/guards/can-activate.guard';
import { MsalGuard } from '@azure/msal-angular';
import { PermissionCheckGuard } from './core/guards/permission-check.guard';

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
    data: {
      breadcrumb: 'Search',
    },
    canActivate: [MsalGuard]
  },
  {
    path: 'investigation-form',
    component: InvestigationFormComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'policy-account/:ctrlno',
    loadChildren: () => import('./policy-account/policy-account.module').then(m => m.PolicyAccountModule),
    data: {
      breadcrumb: 'Policy Info',
    },
    // canActivate: [MsalGuard,CanActivateGuard]
    canActivate: [MsalGuard]

  },
  {
    path: 'investigations/:id',
    loadChildren: () => import('./investigations/investigations.module').then(m => m.InvestigationsModule),
    data: {
      breadcrumb: 'Investigations',
    },
    // canActivate: [MsalGuard,CanActivateGuard]
    canActivate: [MsalGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {
      breadcrumb: 'Admin',
    },
    // canActivate: [MsalGuard,CanActivateGuard]
    canActivate: [MsalGuard]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
    // canActivate: [MsalGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
