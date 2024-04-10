import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { LayoutDialogComponent } from './layout-dialog/layout-dialog.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NumberTransformPipe } from '../number-transform.pipe';
import { FinancialPlanReportComponent } from './financial-plan-report/financial-plan-report.component';
import { FinancialPerformanceReportComponent } from './financial-performance-report/financial-performance-report.component';
import { CapacityUtilizationReportComponent } from './capacity-utilization-report/capacity-utilization-report.component';
import { PlanForecastReportComponent } from './plan-forecast-report/plan-forecast-report.component';

@NgModule({
  declarations: [
    NumberTransformPipe,
    DashboardComponent,
    LayoutDialogComponent,
    FinancialPlanReportComponent,
    FinancialPerformanceReportComponent,
    CapacityUtilizationReportComponent,
    PlanForecastReportComponent
  ],
  imports: [
    CdkAccordionModule,
    FormsModule,
    MatMenuModule,
    MaterialModule,
    CommonModule,
    DashboardRoutingModule,
  ],
  exports:[MaterialModule],
  providers:[]
})
export class DashboardModule { }
