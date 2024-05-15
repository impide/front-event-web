import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { register, registerSuccess, registerFailure } from './auth.actions';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { User, LogginResponse } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((action: ReturnType<typeof register>) =>
        this.authService.register(action.userData).pipe(
          map((message) => registerSuccess({ message: message as string })),
          catchError((error) =>
            of(registerFailure({ error: error.error.message }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action: ReturnType<typeof login>) =>
        this.authService.login(action.userData).pipe(
          map((response) =>
            loginSuccess({ response: response as LogginResponse })
          ),
          catchError((error) =>
            of(loginFailure({ error: error.error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) {}
}
