import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TCounterState } from './counter.state';

const selectCounterState = createFeatureSelector<TCounterState>('counter');
export const selectCounter = createSelector(
  selectCounterState,
  (state: TCounterState) => {
    return state.counter;
  },
);
