import { createAction, props } from '@ngrx/store';

import {
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  COUNTER_RESET,
} from '~/interfaces/counter.interface';

export interface IValue {
  value: number;
}

export const increment = createAction(COUNTER_INCREMENT);
export const decrement = createAction(COUNTER_DECREMENT);
export const reset = createAction(COUNTER_RESET);

export const customIncrement = createAction(
  '[counter] Custom Increment',
  props<{ payload: IValue }>(),
);
