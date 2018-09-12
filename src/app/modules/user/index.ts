import { handleActions } from 'redux-actions';
import { reset } from 'redux-form';
import { combineReducers } from 'redux';

import api from '../../services/api';
import { bodyInterface } from '../../services/api'
import {
    loginStart,
    loginSuccess,
    loginFailure,

    registerStart,
    registerSuccess,
    registerFailure,

    logoutAction,
} from './actions';

export const login = (email: string, password: string) => {
    return (dispatch: Function) => {
        dispatch(loginStart());

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

                dispatch(loginSuccess(data));
            }
        })
        .catch((error) => {
            dispatch(loginFailure(error));
        })
    }
}

export const logout = () => {
    return (dispatch: Function) => {
        localStorage.removeItem('userData');
        dispatch(logoutAction());
    }
}

export const register = (payload: bodyInterface) => {
    return (dispatch: Function) => {
        dispatch(registerStart());

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
            dispatch(registerSuccess(data));
            dispatch(reset('register'));
        })
        .catch(() => {
            dispatch(registerFailure());
        })
    }
}

const registerReducer = handleActions({
    [registerSuccess.toString()]() {
        return {
            hasRegistered: true
        };
    },
}, {
    hasRegistered: false
});

export const userReducer = handleActions({
    [loginSuccess.toString()](state, {payload: { email, firstName, lastName } }) {
        return {
            email,
            firstName,
            lastName
        }
    },
    [logoutAction.toString()]() {
        return null
    }
}, null);

export const reducer = combineReducers({
    data: userReducer,
    register: registerReducer
})