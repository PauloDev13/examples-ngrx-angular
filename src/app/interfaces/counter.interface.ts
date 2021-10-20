interface ICounter {
  counter: number;
}

export type TCounterState = ICounter;

export const COUNTER_INCREMENT = '[counter] increment';
export const COUNTER_DECREMENT = '[counter] decrement';
export const COUNTER_RESET = '[counter] reset';

export const COUNTER_STATE_NAME = 'counter';
