import { Action, createReducer, on } from '@ngrx/store';

import { TSharedState } from '~/interfaces/shared-state.interface';
import { setErrorMessage, setLoadingSpinner } from '~/store/shared/shared.actions';
import { initialState } from '~/store/shared/shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action): TSharedState => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),

  on(setErrorMessage, (state, action): TSharedState => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
);

export const sharedReducer = (state = initialState, action: Action): TSharedState => {
  return _sharedReducer(state, action);
};
