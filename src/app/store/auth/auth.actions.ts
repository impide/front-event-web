import { createAction, props } from '@ngrx/store';
import { LogginResponse, User } from './auth.interface';

export const register = createAction(
  '[Auth] Register',
  props<{ userData: Object }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ message: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ userData: Object }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LogginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
