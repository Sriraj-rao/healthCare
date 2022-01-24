import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUpdateFormComponent } from './doc-update-form.component';

describe('DocUpdateFormComponent', () => {
  let component: DocUpdateFormComponent;
  let fixture: ComponentFixture<DocUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
