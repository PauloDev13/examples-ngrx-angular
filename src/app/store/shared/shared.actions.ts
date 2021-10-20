import { createAction, props } from '@ngrx/store';

import { SET_LOADING_STATE, TSharedState } from '~/interfaces/shared-state.interface';

export const setLoadingSpinner = createAction(
  SET_LOADING_STATE,
  props<{ status: TSharedState }>(),
);
