import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityUtilizationReportComponent } from './capacity-utilization-report.component';

describe('CapacityUtilizationReportComponent', () => {
  let component: CapacityUtilizationReportComponent;
  let fixture: ComponentFixture<CapacityUtilizationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityUtilizationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityUtilizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
