import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_STATE_NAME, TAuthState } from '~/interfaces/auth.interface';

const selectAuthState = createFeatureSelector<TAuthState>(AUTH_STATE_NAME);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: TAuthState) => !!state.user,
);

export const selectGetToken = createSelector(selectAuthState, (state: TAuthState) => {
  return state.user ? state.user.token : null;
});
