import { reset } from 'redux-form';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import api from '../../services/api';
import { bodyInterface } from '../../services/api';
import * as userActions from './actions';
import { IRegisterReducer, IUser } from './interfaces';

type UserActions = ActionType<typeof userActions>;

export const login = (email: string, password: string) => {
    return (dispatch: Function) => {
        dispatch(userActions.loginStart());

        api(
            'login',
            'POST', {
                email,
                password
            },
            false
        )
        .then((response) => {
            const {
                data,
                request
            } = response;

            const token = request.headers.get('x-auth');
            if (token) {
                const userData = {
                    ...data,
                    token
                }
                localStorage.setItem('userData', JSON.stringify(userData));

                dispatch(
                    userActions.loginSuccess(data)
                );
            }
        })
        .catch((error) => {
            dispatch(
                userActions.loginFailure(error.toString())
            );
        })
    }
}

export const logout = () => {
    return (dispatch: Function) => {
        localStorage.removeItem('userData');
        dispatch(userActions.logout());
    }
}

export const register = (payload: bodyInterface) => {
    return (dispatch: Function) => {
        dispatch(userActions.registerStart());

        api(
            'users',
            'POST',
            payload,
            false
        )
        .then((response) => {
            const {
                data
            } = response;
            return data;
        })
        .then((data) => {
            dispatch(
                userActions.registerSuccess(data)
            );
            dispatch(reset('register'));
        })
        .catch(() => {
            dispatch(
                userActions.registerFailure('Failed to register')
            );
        })
    }
}


const registerReducerDefaultState: IRegisterReducer = { hasRegistered: false };
const registerReducer = (state: IRegisterReducer = registerReducerDefaultState, action: UserActions) => {
    switch (action.type) {
        case getType(userActions.registerSuccess):
            return {
                hasRegistered: true
            };
        default:
            return registerReducerDefaultState;
    }
}

const dataReducer = (state: IUser | null, action: UserActions) => {
    switch (action.type) {
        case getType(userActions.loginSuccess):
            const {
                email,
                firstName,
                lastName
            } = action.payload;

            return {
                ...state,
                email,
                firstName,
                lastName
            };
        case getType(userActions.logout):
            return null;
        default:
            return null;
    }
}

interface UserState {
    data: IUser;
    register: IRegisterReducer
}

export const reducer = combineReducers<UserState>({
    data: dataReducer,
    register: registerReducer
});
