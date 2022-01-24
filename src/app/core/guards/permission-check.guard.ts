import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailsSharingService } from '../services/details-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionCheckGuard implements CanActivate {
  constructor(private _router: Router,private _detailsSharing: DetailsSharingService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._detailsSharing.permissionsCheck?.isAddPermissions===true){
        return true;
      }
      else{
        this._router.navigateByUrl('/home');
        return false;
      }
  }
  
}
