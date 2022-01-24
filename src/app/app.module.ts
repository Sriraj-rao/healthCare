import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthTokenInterceptor } from './core/http-interceptors/bearer-token.interceptor';
import { HttpErrorInterceptor } from './core/http-interceptors/http-error.interceptor';
import { DetailsSharingService } from './core/services/details-sharing.service';
import { InvestigationFormComponent } from './investigation-form/investigation-form.component';
import { LoadingService } from './core/services/loading.service';
import { LoaderInterceptor } from './core/http-interceptors/loader.interceptor';
import { StateManagementService } from './core/services/state-management.service';
// import { HomeComponent } from './home/home.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 ||
window.navigator.userAgent.indexOf('Trident/') > -1;
export function loggerCallback() {
}
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.postLogoutRedirectUri,
      authority: environment.authority,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'profile']);
  protectedResourceMap.set(environment.protectedResources.cwbapi.endpoint, environment.protectedResources.cwbapi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    InvestigationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    MsalModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    DetailsSharingService,
    StateManagementService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    DatePipe
  ],
  bootstrap: [AppComponent],

})


export class AppModule { }
