import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICounterState } from './counter.state';

const selectCounterState = createFeatureSelector<ICounterState>('counter');
export const selectCounter = createSelector(
  selectCounterState,
  (state: ICounterState) => {
    return state;
  },
);
