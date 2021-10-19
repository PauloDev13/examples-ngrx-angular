import { createAction, props } from '@ngrx/store';

import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from '~/interfaces/auth.interface';
import { UserModel } from '~/interfaces/user.model';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: UserModel }>());
export const loginFail = createAction(LOGIN_FAIL);
