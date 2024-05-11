import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { RegisterComponent } from './routes/register/register.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
];
