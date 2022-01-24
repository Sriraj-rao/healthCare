import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';

import { ClaimsSubTableComponent } from './claims-sub-table.component';

describe('ClaimsSubTableComponent', () => {
  let component: ClaimsSubTableComponent;
  let fixture: ComponentFixture<ClaimsSubTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsSubTableComponent ],
      imports: [MatTableModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsSubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should check ngOnInIt function calls getRemarkCodesSummary',()=>{
  //   let insSummarySpy=spyOn<any>(component,'getRemarkCodesSummary');
  //   component.ngOnInit();
  //   expect(insSummarySpy).toHaveBeenCalled();
  // });
});
