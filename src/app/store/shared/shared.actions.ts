import { createAction, props } from '@ngrx/store';

import {
  SET_EMPTY_TABLE,
  SET_ERROR_MESSAGE,
  SET_LOADING_STATE,
} from '~/interfaces/shared-state.interface';

export const setLoadingSpinner = createAction(
  SET_LOADING_STATE,
  props<{ status: boolean }>(),
);

export const setEmptyTable = createAction(SET_EMPTY_TABLE, props<{ status: boolean }>());

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>(),
);
