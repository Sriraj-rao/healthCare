import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { BrowserNotSupportedComponent } from './shared/Modals/browser-not-supported/browser-not-supported.component';
import { DetailsSharingService } from './core/services/details-sharing.service';

@Component({
  selector: 'cwb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClaimsWorkbench';
  isIEOrEdge: boolean;
  isLoading: boolean;
  constructor(private dialog: MatDialog){
  }
  ngOnInit() {
    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (this.isIEOrEdge){
      this.openBrowserNotSupported();
    }
    const cwbTheme = localStorage.getItem('cwbTheme');
    if (cwbTheme) {
      environment.cwbTheme = cwbTheme;
    }
    else{
      localStorage.setItem('cwbTheme', environment.cwbTheme);
    }
  }
  openBrowserNotSupported(){
    this.dialog.open(BrowserNotSupportedComponent);
  }
}
