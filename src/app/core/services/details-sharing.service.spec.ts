import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DetailsSharingService } from './details-sharing.service';

describe('DetailsSharingService', () => {
  let service: DetailsSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [DetailsSharingService]
    });
    service = TestBed.inject(DetailsSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
