import {
  Store,
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
} from '@ngrx/store';
import {
  LogginResponse,
  User,
  UserLogin,
  UserRegister,
} from './auth.interface';

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

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    register: props<{ userData: UserRegister }>(),
    registerSuccess: props<{ message: string }>(),
    registerFailure: props<{ error: string }>(),

    login: props<{ userData: UserLogin }>(),
    loginSuccess: props<{ response: LogginResponse }>(),
    loginFailure: props<{ error: string }>(),

    autoLogin: props<{ token: string }>(),
    autoLoginSuccess: props<{ response: LogginResponse }>(),
    autoLoginFailure: props<{ error: string }>(),

    logout: emptyProps(),
  },
});

// Reducer & Selectors
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      authActions.registerFailure,
      authActions.loginFailure,
      authActions.autoLoginFailure,
      (state, { error }) => ({ ...state, error })
    ),
    on(authActions.registerSuccess, (state) => ({ ...state, error: null })),
    on(
      authActions.login,
      authActions.register,
      authActions.autoLogin,
      (state) => {
        console.log('Hello Tony');

        return {
          ...state,
          loading: true,
        };
      }
    ),
    on(authActions.loginSuccess, (state, { response }) => {
      console.log('Hello Tony');

      return {
        ...state,
        user: response.user,
        error: null,
        isAuth: true,
        token: response.token,
      };
    }),
    on(authActions.logout, (state) => ({ ...state, user: null, token: null }))
  ),
});

// Inject
export function injectAuthFeature() {
  const store = inject(Store);

  return {
    register: (userData: UserRegister) =>
      store.dispatch(authActions.register({ userData })),
    autoLogin: (token: string) =>
      store.dispatch(authActions.autoLogin({ token })),

    selectIsAuth: store.selectSignal(authFeature.selectIsAuth),
  };
}
