import * as React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Container } from "reactstrap";

import Login from "./components/Login";
import Home from "./components/Home";
import RegisterUser from './components/RegisterUser';
import Navigation, { INavigationProps } from './components/Navigation';

import {
    userIsAuthenticatedRedir,
    userIsNotAuthenticated,
    visibleAuthenticated
} from "./auth";
import store from "./store";

const App: React.SFC = () => {
    const ProtectedNavigation = visibleAuthenticated(() => <Navigation />)
    return (
        <Provider store={store}>
                <Router>
                    <Container>
                        <ProtectedNavigation />
                        <Route
                            exact
                            path="/"
                            component={userIsAuthenticatedRedir(Home)}
                        />
                        <Route
                            path="/login"
                            component={userIsNotAuthenticated(Login)}
                        />
                        <Route
                            path="/register"
                            component={userIsNotAuthenticated(RegisterUser)}
                        />
                    </Container>
                </Router>
            </Provider>
    );
}

export default App;
