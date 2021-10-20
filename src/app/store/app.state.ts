import { SHARED_STATE_NAME, TSharedState } from '~/interfaces/shared-state.interface';
import { sharedReducer } from '~/store/shared/shared.reducer';

export type TAppState = {
  [SHARED_STATE_NAME]: TSharedState;
};

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
};
