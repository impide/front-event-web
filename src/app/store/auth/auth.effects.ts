import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { authActions } from './auth.store';
import { User, LogginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      debounceTime(500),
      switchMap((action: ReturnType<typeof authActions.register>) => {
        return this.authService.register(action.userData).pipe(
          map((message) => {
            this.snackBar.open('Inscription réussi', 'Close', {
              duration: 4000,
            });
            this.router.navigate(['/login']);
            return authActions.registerSuccess({ message: message as string });
          }),
          catchError((error) => {
            return of(
              authActions.registerFailure({ error: error.error.message })
            );
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      debounceTime(500),
      switchMap((action: ReturnType<typeof login>) =>
        this.authService.login(action.userData).pipe(
          map((response) => {
            this.snackBar.open('Connexion réussi', 'Close', {
              duration: 4000,
            });
            this.router.navigate(['/account-settings']);
            localStorage.setItem('token', response.token);
            return loginSuccess({ response: response as LogginResponse });
          }),
          catchError((error) =>
            of(loginFailure({ error: error.error.message }))
          )
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      switchMap((action: ReturnType<typeof authActions.autoLogin>) =>
        this.authService.autoLogin(action.token).pipe(
          map((response) => {
            console.log('hello Nath');

            return authActions.loginSuccess({
              response: response as LogginResponse,
            });
          }),
          catchError((error) =>
            of(authActions.autoLoginFailure({ error: error.error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
