export const LOGIN_START = '[auth page] Login start';
export const LOGIN_SUCCESS = '[auth page] Login success';
export const LOGIN_FAIL = '[auth page] Login fail';

export const AUTH_STATE_NAME = 'auth';

interface IAuthProps {
  email: string;
  password: string;
}

export type TAuthProps = {
  user: IAuthProps;
};

interface IAuthState {}

export type TAuthState = {
  auth: IAuthState;
};
