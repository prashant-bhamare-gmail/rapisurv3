import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanReportComponent } from './financial-plan-report.component';

describe('FinancialPlanReportComponent', () => {
  let component: FinancialPlanReportComponent;
  let fixture: ComponentFixture<FinancialPlanReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPlanReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPlanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
