import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentRequestsComponent } from './manage-document-requests.component';

describe('ManageDocumentRequestsComponent', () => {
  let component: ManageDocumentRequestsComponent;
  let fixture: ComponentFixture<ManageDocumentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDocumentRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
