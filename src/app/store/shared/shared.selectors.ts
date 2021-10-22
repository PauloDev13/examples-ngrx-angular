import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SHARED_STATE_NAME, TSharedState } from '~/interfaces/shared-state.interface';

const selectSharedState = createFeatureSelector<TSharedState>(SHARED_STATE_NAME);

export const selectShared = createSelector(selectSharedState, (state: TSharedState) => {
  return state.showLoading;
});

export const selectEmptyTable = createSelector(
  selectSharedState,
  (state: TSharedState) => {
    return state.isEmpty;
  },
);

export const selectErrorMessage = createSelector(
  selectSharedState,
  (state: TSharedState) => {
    return state.errorMessage;
  },
);
