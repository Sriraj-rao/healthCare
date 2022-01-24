import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddInvestigationService } from './add-investigation.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';


describe('AddInvestigationService', () => {
  let service: AddInvestigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, ],
      providers: [AddInvestigationService]
    });
    service = TestBed.inject(AddInvestigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
