import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentTemplatesComponent } from './manage-document-templates.component';

describe('ManageDocumentTemplatesComponent', () => {
  let component: ManageDocumentTemplatesComponent;
  let fixture: ComponentFixture<ManageDocumentTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDocumentTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
