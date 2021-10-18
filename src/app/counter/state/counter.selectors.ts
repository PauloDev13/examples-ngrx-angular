import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COUNTER_STATE_NAME } from '~/interfaces/counter.interface';

import { TCounterState } from './counter.state';

const selectCounterState = createFeatureSelector<TCounterState>(COUNTER_STATE_NAME);
export const selectCounter = createSelector(
  selectCounterState,
  (state: TCounterState) => {
    return state.counter;
  },
);
