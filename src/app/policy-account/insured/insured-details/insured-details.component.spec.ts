import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InsuredDetailsComponent } from './insured-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('InsuredDetailsComponent', () => {
  let component: InsuredDetailsComponent;
  let fixture: ComponentFixture<InsuredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuredDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInIt function calls onNameClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onNameClicked');
    component.onNameClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('should check Reload Insured button click calls onReloadInsured()', async(() => {
    spyOn<any>(component, 'onReloadInsured');
    const el = fixture.debugElement
      .query(By.css('button'))
      .nativeElement.click();
    fixture.whenStable().then(() => {
      expect(component.onReloadInsured).toHaveBeenCalled();
    });
  }));

  it('should check onNameClicked function calls onNameClicked', () => {
    const insSummarySpy = spyOn<any>(component, 'onNameClicked');
    component.onNameClicked();
    expect(insSummarySpy).toHaveBeenCalled();
  });

  it('isPaperless Method is called', () => {
    const param: any = null;
    spyOn(component, 'isPaperless'); // spy first
    component.isPaperless(param);
    expect(component.isPaperless).toHaveBeenCalledWith(param);
  });

  it('overduePTD Method is called', () => {
    const param: any = null;
    spyOn(component, 'overduePTD'); // spy first
    component.overduePTD(param);
    expect(component.overduePTD).toHaveBeenCalledWith(param);
  });
});
