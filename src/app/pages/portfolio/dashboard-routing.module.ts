import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancialPlanReportComponent } from './financial-plan-report/financial-plan-report.component';
import { PlanForecastReportComponent } from './plan-forecast-report/plan-forecast-report.component';
import { CapacityUtilizationReportComponent } from './capacity-utilization-report/capacity-utilization-report.component';
import { FinancialPerformanceReportComponent } from './financial-performance-report/financial-performance-report.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {path : ':id' , component : DashboardComponent}
    ]
  },
  {
    path: 'financial-plan-report/:id',
    component: FinancialPlanReportComponent
  },
  {
    path: 'financial-performance-report/:id',
    component: FinancialPerformanceReportComponent
  },
  {
    path: 'plan-forecast-report/:id',
    component: PlanForecastReportComponent
  },
  {
    path: 'capacity-utilization-report/:id',
    component: CapacityUtilizationReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
