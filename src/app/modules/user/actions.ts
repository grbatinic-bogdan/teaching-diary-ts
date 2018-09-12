import { createAction } from 'redux-actions';

const LOGOUT = 'LOGOUT';

const LOGIN_START = 'LOGIN_START'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const REGISTER_START = 'REGISTER_START';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const loginStart = createAction(LOGIN_START);
export const loginSuccess = createAction(LOGIN_SUCCESS, (payload: any) => payload);
export const loginFailure = createAction(LOGIN_FAILURE, (error: any) => error);

export const registerStart = createAction(REGISTER_START);
export const registerSuccess = createAction(REGISTER_SUCCESS, (payload: any) => payload);
export const registerFailure = createAction(REGISTER_FAILURE);

export const logoutAction = createAction(LOGOUT);
