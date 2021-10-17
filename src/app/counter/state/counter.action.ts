import { createAction } from '@ngrx/store';

export const increment = createAction('[counter] increment');
export const decrement = createAction('[counter] decrement');
export const reset = createAction('[counter] reset');
