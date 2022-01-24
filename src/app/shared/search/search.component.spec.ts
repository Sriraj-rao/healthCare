import { ComponentFixture, TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { SearchService } from './services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreService } from '../../core/services/core.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const mockClaimResults = {
  data: [],
  isSuccess: true
};

const mockSearchResults = {
  data: [
    {
      address: '4710 OASIS PT',
      city: 'KATY',
      clientNo: '0010446761',
      displayName: 'RICKY Z RODRIGUEZ',
      dob: '4/10/1997',
      firstName: 'RICKY',
      lastName: 'Zachary RODRIGUEZ',
      middleName: null,
      relationship: 'Dependent',
      state: 'TX',
      zip: '77493'
    },
{
      address: '4710 OASIS PT',
      city: 'KATY',
      clientNo: '0010446761',
      displayName: 'RICKY Z RODRIGUEZ',
      dob: '4/10/1997',
      firstName: 'RICKY',
      lastName: 'Zach RODRIGUEZ',
      middleName: null,
      relationship: 'Dependent',
      state: 'TX',
      zip: '77493'
    },
{
      address: '4710 OASIS PT',
      city: 'KATY',
      clientNo: '0010446761',
      displayName: 'RICKY Z RODRIGUEZ',
      dob: '4/10/1997',
      firstName: 'RICKY',
      lastName: 'Peter',
      middleName: null,
      relationship: 'Dependent',
      state: 'TX',
      zip: '77493'
    }
  ],
  isSuccess: true,
  message: ''
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let testBedCoreService: CoreService;
  const mockResults = mockSearchResults;
  const mockDummyClaimResults = mockClaimResults;
  let testBedSearchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent, NavbarComponent ],
      imports: [
        RouterTestingModule,
        MatAutocompleteModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],

        providers: [SearchService],


    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedCoreService = TestBed.get(CoreService);
    testBedSearchService = TestBed.get(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load the search when the page loads', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should check the core service', () => {
    expect(testBedCoreService instanceof CoreService).toBeTruthy();
  });

  it('should check the search service', () => {
    expect(testBedSearchService instanceof SearchService).toBeTruthy();
  });

  it('should inject core service using inject function and check its instance', inject([CoreService], (coreService: CoreService) => {
    expect(coreService).toBeTruthy();
    expect(coreService instanceof CoreService).toBeTruthy();
  }));

  it('should inject search service using inject function and check its instance', inject([SearchService], (searcService: SearchService) => {
    expect(searcService).toBeTruthy();
    expect(searcService instanceof SearchService).toBeTruthy();
  }));

  it('testing subscribe method is getting called for claims', fakeAsync(() => {
    const searchAccountSpy = spyOn(testBedSearchService, 'getClaimsByClaimNumber').and.returnValue(of(mockDummyClaimResults));
    const subSpy = spyOn(testBedSearchService.getClaimsByClaimNumber('192674429G'), 'subscribe');
    component.getPolicyNumberByClaimNumber('192674429G');
    expect(searchAccountSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('testing subscribe method is getting called', fakeAsync(() => {
    const searchAccountSpy = spyOn(testBedSearchService, 'searchForAccountCustomer').and.returnValue(of(mockResults));
    const subSpy = spyOn(testBedSearchService.searchForAccountCustomer('zac'), 'subscribe');
    component._filterStates('zac');
    expect(searchAccountSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  // it('should check filter function is triggered on input value changes of length >=3', () => {
  //   const searchControl = component.nameSearchControl;
  //   const searchSpy = spyOn<any>(component, '_filterStates');
  //   searchControl.setValue('zaca');
  //   expect(searchSpy).toHaveBeenCalled();
  // });

  // it('should check filter function is not triggered when input length is less than 3', () => {
  //   const searchControl = component.nameSearchControl;
  //   const searchSpy = spyOn<any>(component, '_filterStates');
  //   searchControl.setValue('za');
  //   expect(searchSpy).not.toHaveBeenCalled();
  // });

  it('should check filter function calls searchForPerson', () => {
    const searchSpy = spyOn<any>(component, 'searchForPerson');
    component._filterStates('zac');
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should check filter function does not call searchForPerson when searched by member id or investigation id', () => {
    const searchSpy = spyOn<any>(component, 'searchForPerson');
    component._filterStates('1998989890');
    expect(searchSpy).not.toHaveBeenCalled();
    component._filterStates('m-zac');
    expect(searchSpy).not.toHaveBeenCalled();
  });

  it('should check filter function does not call searchForPerson when searched by member id or investigation id', () => {
    const searchSpy = spyOn<any>(component, 'searchForPerson');
    component._filterStates('1998989890');
    expect(searchSpy).not.toHaveBeenCalled();
    component._filterStates('m-zac');
    expect(searchSpy).not.toHaveBeenCalled();
  });


});
