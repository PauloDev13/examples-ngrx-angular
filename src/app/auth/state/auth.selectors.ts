import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_STATE_NAME, TAuthState } from '~/interfaces/auth.interface';

const selectAuthState = createFeatureSelector<TAuthState>(AUTH_STATE_NAME);
export const selectAuth = createSelector(
  selectAuthState,
  (state: TAuthState) => state.auth,
);