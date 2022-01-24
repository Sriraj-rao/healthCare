import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClaimsService } from './claims-service.service';

describe('ClaimsServiceService', () => {
  let service: ClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimsService]

    });
    service = TestBed.inject(ClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
