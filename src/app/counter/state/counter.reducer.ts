import { Action, createReducer, on } from '@ngrx/store';

import { decrement, increment, reset } from './counter.action';
import { ICounterState, initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state): ICounterState => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state): ICounterState => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state): ICounterState => {
    return {
      ...state,
      counter: 0,
    };
  }),
);

export const counterReducer = (state = initialState, action: Action) => {
  return _counterReducer(state, action);
};
