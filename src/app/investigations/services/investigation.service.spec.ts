import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InvestigationsService } from './investigation.service';

describe('InvestigationService', () => {
  let service: InvestigationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvestigationsService]
    });
    service = TestBed.inject(InvestigationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
