import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailsSharingService } from '../services/details-sharing.service';
import { LoadingService, LoadingOverlayRef } from '../services/loading.service';
import { StateManagementService } from '../services/state-management.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    private urlsToIgnore = [
        'Investigation/GetClaimsByInvestigation',
        'Document/GetDocumentRequestsByInvestigation',
        'Document/GetMiscellaneousDocuments',
        'Coverage/GetPpoInformation',
        'Coverage/GetCoverageIcons'
    ];

    constructor(private detailsSharing: DetailsSharingService, private loadingService: LoadingService,
                private stateMgmt: StateManagementService) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (req.url.indexOf('Contact/GetSearchResult') >= 0) {
            this.detailsSharing.isSearchLoading.next(this.requests.length > 0);
        }
        else {
            this.detailsSharing.isLoading.next(this.requests.length > 0);
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/Investigation/') && req.method === 'POST'){
            if (this.stateMgmt.getInvestigationTabDetails() && this.stateMgmt.getInvestigationTabDetails() != null){
                this.stateMgmt.setInvestigationTabDetails({...this.stateMgmt.getInvestigationTabDetails(), isInvUpdated: true});
            }
        }
        if (req.url.indexOf(this.urlsToIgnore[0]) >= 0 || req.url.indexOf(this.urlsToIgnore[1]) >= 0 ||
        req.url.indexOf(this.urlsToIgnore[2]) >= 0 || req.url.indexOf(this.urlsToIgnore[3]) >= 0  ||
         req.url.indexOf(this.urlsToIgnore[4]) >= 0) {
            return next.handle(req);
        }
        else {
            let loadingRef: LoadingOverlayRef;
            this.detailsSharing.errorOccurred = false;
            this.requests.push(req);
            if (req.url.indexOf('Contact/GetSearchResult') >= 0) {
                this.detailsSharing.isSearchLoading.next(true);
            }
            else {
                this.detailsSharing.isLoading.next(true);
                Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
            }
            this.detailsSharing.errorOccurred = false;

            return Observable.create(observer => {
                const subscription = next.handle(req)
                    .subscribe(
                        event => {
                            if (event instanceof HttpResponse) {
                                this.removeRequest(req);
                                observer.next(event);
                                if (loadingRef) {
                                    loadingRef.close();
                                }
                            }
                        },
                        err => {
                            this.removeRequest(req);
                            observer.error(err);
                            if (loadingRef) {
                                loadingRef.close();
                            }
                        },
                        () => {
                            this.removeRequest(req);
                            observer.complete();
                            if (loadingRef) {
                                loadingRef.close();
                            }
                        });
                // remove request from queue when cancelled
                return () => {
                    this.removeRequest(req);
                    subscription.unsubscribe();
                };
            });
        }

    }
}
