import { Action, createReducer, on } from '@ngrx/store';

import { TCounterState } from '~/interfaces/counter.interface';

import { customIncrement, decrement, increment, reset } from './counter.actions';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state): TCounterState => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state): TCounterState => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state): TCounterState => {
    return {
      ...state,
      counter: 0,
    };
  }),

  on(customIncrement, (state, action): TCounterState => {
    console.log(action);
    const { value } = action.payload;
    return {
      ...state,
      counter: state.counter + value,
    };
  }),
);

export const counterReducer = (state = initialState, action: Action) => {
  return _counterReducer(state, action);
};
