import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ShowProjectComponent } from './projects/show-project/show-project.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainDashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'portfolio',
        loadChildren: () => import('./portfolio/dashboard.module')
          .then(m => m.DashboardModule),
      },
      {
        path: 'dashboard',
        component: MainDashboardComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'projects/:project_id',
        component: ShowProjectComponent
      },
      {
        path: '',
        redirectTo: 'portfolio',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
