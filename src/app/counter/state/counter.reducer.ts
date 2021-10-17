import { Action, createReducer, on } from '@ngrx/store';

import { customIncrement, decrement, increment, reset } from './counter.actions';
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

  on(customIncrement, (state, action): ICounterState => {
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
