import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanForecastReportComponent } from './plan-forecast-report.component';

describe('PlanForecastReportComponent', () => {
  let component: PlanForecastReportComponent;
  let fixture: ComponentFixture<PlanForecastReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanForecastReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanForecastReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
