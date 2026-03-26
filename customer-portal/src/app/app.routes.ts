import {Routes} from '@angular/router'; 
import { RegisterComponent } from './auth/components/register/register';
import { ActivateComponent } from './auth/components/activate/activate';
import { LoginComponent } from './auth/components/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }

];