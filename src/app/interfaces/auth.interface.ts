import { UserModel } from '~/interfaces/user.model';

export const LOGIN_START = '[auth page] Login start';
export const LOGIN_SUCCESS = '[auth page] Login success';
export const SIGNUP_START = '[auth page] Signup start';
export const SIGNUP_SUCCESS = '[auth page] Signup success';

export const AUTO_LOGIN_ACTION = '[auth page] Auto Login Action';
export const AUTO_LOGOUT_ACTION = '[auth page] Logout Action';

export const AUTH_STATE_NAME = 'auth';

interface IAuthProps {
  email: string;
  password: string;
}

export type TAuthProps = IAuthProps;

interface IAuthState {
  user: UserModel | null;
}

export type TAuthState = IAuthState;
