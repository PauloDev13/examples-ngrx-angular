import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from '~/store/router/custom-serializer';

export const selectGetRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectCurrentRoute = createSelector(selectGetRouterState, (router) => {
  return router.state;
});
