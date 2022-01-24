import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsAttachedSubTableComponent } from './claims-attached-sub-table.component';

xdescribe('ClaimsAttachedSubTableComponent', () => {
  let component: ClaimsAttachedSubTableComponent;
  let fixture: ComponentFixture<ClaimsAttachedSubTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsAttachedSubTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsAttachedSubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
