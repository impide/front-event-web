import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AccountSettingComponent } from './routes/account-setting/account-setting.component';
import { InformationsComponent } from './routes/account-setting/informations/informations.component';
import { PreferencesComponent } from './routes/account-setting/preferences/preferences.component';
import { SecurityComponent } from './routes/account-setting/security/security.component';
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
    children: [
      {
        path: '',
        redirectTo: 'informations',
        pathMatch: 'full',
      },
      {
        path: 'informations',
        component: InformationsComponent,
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
      },
      {
        path: 'security',
        component: SecurityComponent,
      },
    ],
    canActivate: [authGuard],
  },
];
