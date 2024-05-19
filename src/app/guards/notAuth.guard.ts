import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { injectAuthFeature } from '../store/auth/auth.store';

export const notAuthGuard: CanActivateFn = () => {
  const authFeature = injectAuthFeature();
  const isAuth = authFeature.selectIsAuth();
  const router = inject(Router);

  return new Observable((observer) => {
    if (isAuth) {
      router.navigate(['/account-settings']);
      observer.next(false);
      observer.complete();
    } else {
      observer.next(true);
      observer.complete();
    }
  });
};
