import { createAction, props } from '@ngrx/store';

export interface IValue {
  value: number;
}

export const increment = createAction('[counter] increment');
export const decrement = createAction('[counter] decrement');
export const reset = createAction('[counter] reset');

export const customIncrement = createAction(
  '[counter] Custom Increment',
  props<{ payload: IValue }>(),
);
