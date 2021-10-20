export const SHARED_STATE_NAME = 'shared';
export const SET_LOADING_STATE = '[Shared State] Set Loading Spinner';
export const SET_ERROR_MESSAGE = '[Shared State] Set Error Message';

interface ISharedState {
  showLoading: boolean;
  errorMessage: string;
}

export type TSharedState = ISharedState;
