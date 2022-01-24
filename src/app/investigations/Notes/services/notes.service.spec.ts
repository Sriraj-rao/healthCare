import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      RouterTestingModule],
      providers: [NotesService]
    });
    service = TestBed.inject(NotesService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
