import { createAction, props } from '@ngrx/store';

import {
  AUTO_LOGIN_ACTION,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTO_LOGOUT_ACTION,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from '~/interfaces/auth.interface';
import { UserModel } from '~/interfaces/user.model';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: UserModel; redirect: boolean }>(),
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>(),
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: UserModel; redirect: boolean }>(),
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(AUTO_LOGOUT_ACTION);
export const dummyAction = createAction('[dummy action] Dummy Action');
