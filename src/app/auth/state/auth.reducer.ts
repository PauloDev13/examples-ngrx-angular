import { Action, createReducer } from '@ngrx/store';

import { initialState } from '~/auth/state/auth.state';

const _authReducer = createReducer(initialState);

export const authReducer = (state = initialState, action: Action) =>
  _authReducer(state, action);
