export const SHARED_STATE_NAME = 'shared';
export const SET_LOADING_STATE = '[Shared State] Set Loading Spinner';
export const SET_EMPTY_TABLE = '[Shared State] Set empty table';
export const SET_ERROR_MESSAGE = '[Shared State] Set Error Message';

interface ISharedState {
  showLoading: boolean;
  isEmpty: boolean;
  errorMessage: string;
}

export type TSharedState = ISharedState;
