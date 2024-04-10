import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPerformanceReportComponent } from './financial-performance-report.component';

describe('FinancialPerformanceReportComponent', () => {
  let component: FinancialPerformanceReportComponent;
  let fixture: ComponentFixture<FinancialPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPerformanceReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
