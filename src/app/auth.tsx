import * as React from 'react';
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";

import store from "./store";
import { loginSuccess } from "./modules/user/actions";

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    authenticatedSelector: (state: any) => {
        const hasUserState = state.user.data !== null;
        let userDataRaw: string|null = localStorage.getItem("userData");

        if (!hasUserState && userDataRaw !== null) {
            const userData = JSON.parse(userDataRaw);
            const { email, firstName, lastName } = userData;

            store.dispatch(
                loginSuccess({
                    email,
                    firstName,
                    lastName
                })
            );
            return true;
        }

        return hasUserState;
    },
    wrapperDisplayName: "UserIsAuthenticated"
};

export const userIsAuthenticated = connectedAuthWrapper(
    userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    redirectPath: "/login"
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || "/",
    allowRedirectBack: false,
    authenticatedSelector: state => localStorage.getItem("userData") === null,
    wrapperDisplayName: "UserIsNotAuthenticated"
});

export const visibleAuthenticated = connectedAuthWrapper({
    authenticatedSelector: state => localStorage.getItem("userData") !== null,
    wrapperDisplayName: "AuthenticatedOrEmpty",
    FailureComponent: () => <div />
});
