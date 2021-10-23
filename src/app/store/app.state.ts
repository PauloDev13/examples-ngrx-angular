import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { authReducer } from '~/auth/state/auth.reducer';
import { AUTH_STATE_NAME, TAuthState } from '~/interfaces/auth.interface';
import { SHARED_STATE_NAME, TSharedState } from '~/interfaces/shared-state.interface';
import { sharedReducer } from '~/store/shared/shared.reducer';

export type TAppState = {
  [SHARED_STATE_NAME]: TSharedState;
  [AUTH_STATE_NAME]: TAuthState;
  router: RouterReducerState;
};

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer,
  router: routerReducer,
};
