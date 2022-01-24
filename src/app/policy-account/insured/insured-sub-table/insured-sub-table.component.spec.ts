import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredSubTableComponent } from './insured-sub-table.component';

describe('InsuredSubTableComponent', () => {
  let component: InsuredSubTableComponent;
  let fixture: ComponentFixture<InsuredSubTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuredSubTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredSubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
