import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COUNTER_STATE_NAME, TCounterState } from '~/interfaces/counter.interface';

const selectCounterState = createFeatureSelector<TCounterState>(COUNTER_STATE_NAME);
export const selectCounter = createSelector(
  selectCounterState,
  (state: TCounterState) => {
    return state.counter;
  },
);
