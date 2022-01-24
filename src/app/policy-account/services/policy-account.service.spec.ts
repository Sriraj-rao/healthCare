import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PolicyAccountsService } from './policy-account.service';


describe('PolicyAccountService', () => {
  let service: PolicyAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule]
    });
    service = TestBed.inject(PolicyAccountsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
