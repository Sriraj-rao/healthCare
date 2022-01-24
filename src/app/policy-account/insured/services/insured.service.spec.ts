import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InsuredService } from './insured.service';

describe('InsuredService', () => {
  let service: InsuredService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [InsuredService]
    });
    service = TestBed.inject(InsuredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
