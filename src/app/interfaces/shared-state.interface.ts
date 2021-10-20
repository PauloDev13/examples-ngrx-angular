export const SHARED_STATE_NAME = 'shared';
export const SET_LOADING_STATE = '[Shared State] Set Loading Spinner';

interface ISharedState {
  showLoading: boolean;
}

export type TSharedState = ISharedState;
