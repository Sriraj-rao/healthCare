import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faThLarge,
  faFile,
  faEnvelope,
  faPeopleArrows,
  faCog,
  faUser,
  faBell,
  faSearch,
  faTachometerAlt,
  faSearchPlus,
  faFileAlt,
  faEnvelopeOpenText,
  faUsersCog,
  faQuestionCircle,
  faUserCircle,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { MatSidenav } from '@angular/material/sidenav';
import {
  onSideNavChange,
  animateText,
} from 'src/app/shared/animations/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { MsalService } from '@azure/msal-angular';
import { startWith, delay, take } from 'rxjs/operators';

@Component({
  selector: 'cwb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.' + environment.cwbTheme + '.scss'],
  animations: [onSideNavChange, animateText],
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  faThLarge: IconDefinition = faThLarge;
  faFile: IconDefinition = faFile;
  faEnvelope: IconDefinition = faEnvelope;
  faPeopleArrows: IconDefinition = faPeopleArrows;
  faCog: IconDefinition = faCog;
  faUser: IconDefinition = faUser;
  faBell: IconDefinition = faBell;
  faQuestionCircle = faQuestionCircle;
  faTachometerAlt = faTachometerAlt;
  faSearchPlus = faSearchPlus;
  faUserShield=faUserShield;
  faSearch = faSearch;
  faFileAlt = faFileAlt;
  faUsersCog = faUsersCog;
  faUserCircle = faUserCircle;
  faEnvelopeOpenText = faEnvelopeOpenText;

  currentPolicy: string;
  userName: string;
  userGreeting = '';
  userInitials = '';
  public sideNavState = false;
  public linkText = false;
  public onSideNavChange: boolean;
  timeNow: Date;
  interval;
  currentPolicyRoute: string;
  currentInvRoute: { name: string; query: string; value: boolean | string };

  constructor(
    private cdr: ChangeDetectorRef,
    public detailsSharing: DetailsSharingService,
    private msalService: MsalService
  ) {}

  ngOnChanges() {}
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.timeNow = new Date();
    }, 1);
    this.detailsSharing.policyForRoute
      .pipe(startWith(null), delay(0))
      .subscribe((response) => {
        this.currentPolicyRoute = response;
      });
    this.detailsSharing.invForRoute.subscribe((response) => {
      this.currentInvRoute = response;
    });
    this.detailsSharing.loggedInUserDetails
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.userInitials = response.userInitials;
          this.userGreeting = response.userGreeting;
          this.cdr.detectChanges();
        }
      });
  }
  // event handler for emmiting policy no
  onCurrentPolicyEmitted($event) {
    this.currentPolicy = $event;
  }

  onThemeChange() {
    if (environment.cwbTheme === 'oz') {
      environment.cwbTheme = 'cwb';
      localStorage.setItem('cwbTheme', 'cwb');
    } else {
      environment.cwbTheme = 'oz';
      localStorage.setItem('cwbTheme', 'oz');
    }

    window.location.reload();
  }

  // toggles the sidenav
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    this.linkText = this.sideNavState;
    this.detailsSharing.isSidenavExpanded.next(this.sideNavState);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
