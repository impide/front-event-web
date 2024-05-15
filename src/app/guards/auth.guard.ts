import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../store/auth/auth.selector';
import { Observable, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const isAuth = store.select(selectIsAuth);
  const router = inject(Router);

  return new Observable((observer) => {
    isAuth.pipe(take(1)).subscribe((isAuth) => {
      if (!isAuth) {
        router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  });
};
