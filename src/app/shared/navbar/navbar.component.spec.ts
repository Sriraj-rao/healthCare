import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { SearchComponent } from '../search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from '../search/services/search.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MSALInstanceFactory } from 'src/app/app.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, SearchComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        FontAwesomeModule,
        MatListModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MsalModule,
      ],
      providers: [
        SearchService,
        MsalService,
        LoadingService,

        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        },

        //  {
        //   provide:  MSAL_GUARD_CONFIG,
        // },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain sidenav in close state when the page loads', () => {
    expect(component.sideNavState).toBe(false);
  });

  // it('should be in the active state if the icon is clicked ', () => {
  //   expect(component._sidenavService.investigationActive).toBe(true);
  // });

  it('should toggle the sidenavState ', () => {
    expect(component.sideNavState).toBeFalsy();
    component.onSinenavToggle();
    expect(component.sideNavState).toBeTruthy();
  });

  // it('should call the toggleSidenavIcons method ', () => {
  //   fixture.detectChanges();
  //   spyOn(component,'toggleSidenavIcons');
  //   const el = fixture.debugElement.query(By.css('a')).nativeElement;
  //   el.click();
  //   expect(component.toggleSidenavIcons).toHaveBeenCalledTimes(1);
  // });
});
