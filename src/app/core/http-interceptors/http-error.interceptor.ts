import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { DetailsSharingService } from '../services/details-sharing.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private snackbar: MatSnackBar, private detailsSharing: DetailsSharingService) {
    }
    count = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // A client-side or network error occurred. Handle it accordingly.
                        errorMessage = `An error occurred: ${error.error.message}`;
                    } else if (error.error !== null && typeof error.error === 'object') {
                        // Maybe server-side validation errors
                        for (const key in error.error) {
                            if (error.error.hasOwnProperty(key) && key.toLowerCase() === 'message') {
                                const element = error.error[key];
                                errorMessage += ` ${element}`;
                            }
                        }
                        if (errorMessage.trim() === '') {
                            errorMessage = `${error.message}`;
                        }
                    } else {
                        errorMessage = `${error.error}`;
                    }
                    if (this.count === 0) {

                    }
                    this.detailsSharing.errorOccurred = true;
                    this.detailsSharing.openSnackBar('ERROR OCCURED:  ' + errorMessage, 'Dismiss', true);
                    this.count = this.count + 1;
                    return throwError(errorMessage);
                })
            );
    }
    openSnackBar(message: string, action: string, caseError: boolean) {
        this.snackbar.open(message, action, {
            duration: 1000 * 60 * 5,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: caseError ? 'snackbar-error' : 'snackbar-success'
        });
    }
}
