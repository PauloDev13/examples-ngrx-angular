import { Action, createReducer, on } from '@ngrx/store';

import { loginSuccess, logoutAction, signupSuccess } from '~/auth/state/auth.actions';
import { initialState } from '~/auth/state/auth.state';
import { TAuthState } from '~/interfaces/auth.interface';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action): TAuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action): TAuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(logoutAction, (state): TAuthState => {
    return {
      ...state,
      user: null,
    };
  }),
);

export const authReducer = (state = initialState, action: Action) => {
  return _authReducer(state, action);
};
