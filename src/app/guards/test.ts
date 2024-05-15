import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { selectIsAuth } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private store: Store, private router: Router) {}

  authGuard: CanActivateFn = (route, state) => {
    let isAuthenticated = false;

    this.store.select(selectIsAuth).subscribe((isAuth: boolean) => {
      isAuthenticated = isAuth;
    });

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
}
