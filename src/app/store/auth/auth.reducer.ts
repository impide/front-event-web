import { Store, createReducer, on } from '@ngrx/store';
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logout,
  login,
} from './auth.actions';
import { User } from './auth.interface';
import { inject } from '@angular/core';

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isAuth: boolean;
  token: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  isAuth: false,
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(registerSuccess, (state) => ({ ...state, error: null })),
  on(registerFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    error: null,
    isAuth: true,
    token: response.token,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(logout, (state) => ({ ...state, user: null }))
);
