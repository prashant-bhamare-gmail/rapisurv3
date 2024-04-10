import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthStateComponent } from './auth-state/auth-state.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {    
    path: 'authenticate/:username/:is2Fa',
    component: AuthStateComponent,
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
