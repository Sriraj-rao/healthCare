import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailsSharingService } from '../services/details-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private router: Router, private detailsSharing: DetailsSharingService){}
  // handles the routing when the page loads
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.detailsSharing.isSearchActive === true){
        return true;
      }
      else{
        this.router.navigateByUrl('/home');
        return false;
      }
  }

}
