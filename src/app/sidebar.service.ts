import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public sideNavState$: Subject<boolean> = new Subject();
  constructor() { }
}
