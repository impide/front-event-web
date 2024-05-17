import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuardService } from './guards/test';
import { authGuard } from './guards/auth.guard';
import { AccountSettingComponent } from './routes/account-setting/account-setting.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'account-settings',
    component: AccountSettingComponent,
    // canActivate: [authGuard],
  },
];
