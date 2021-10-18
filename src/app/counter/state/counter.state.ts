import { ICounter } from '~/interfaces/counter.interface';

export type TCounterState = ICounter;

export const initialState: TCounterState = {
  counter: 4,
};
