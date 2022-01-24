import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
import { InteractionRequiredAuthError } from 'msal';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  token: string;

  constructor(private msalService: MsalService) {



  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const silentRequest = {
      account: this.msalService.instance.getAllAccounts()[0],
      scopes: environment.protectedResources.cwbapi.scopes,
      forceRefresh: true
    };

    return from(this.msalService.acquireTokenSilent(
      silentRequest
   ).toPromise().then(token => {
       const JWT = `Bearer ${token.accessToken}`;
       return req.clone({
           setHeaders: {
               Authorization: JWT,
               'Content-Type': 'application/json'
           },
       });
   }).catch(error => {
    if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
      this.msalService.acquireTokenRedirect(silentRequest);
    } else {
    }
    return null;
 })
   ).pipe(mergeMap(r => next.handle(r)));
  }
}
