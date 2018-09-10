import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import connectedAuthWrapper from "redux-auth-wrapper/connectedAuthWrapper";

import store from "./store";
import { loginAction } from "./modules/user/actions";

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    //authenticatedSelector: state => localStorage.getItem('userData') !== null,
    authenticatedSelector: state => {
        const hasUserState = state.user.data !== null;
        let userData = localStorage.getItem("userData");

        if (!hasUserState && userData !== null) {
            userData = JSON.parse(userData);
            const { email, firstName, lastName } = userData;

            store.dispatch(
                loginAction({
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
