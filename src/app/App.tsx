import * as React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/Login";
import Home from "./components/Home";
import { Container } from "reactstrap";
import {
    userIsAuthenticatedRedir,
    userIsNotAuthenticated,
} from "./auth";
import store from "./store";

const App: React.SFC = () => {
    return (
        <Provider store={store}>
                <Router>
                    <Container>
                        <Route
                            exact
                            path="/"
                            component={userIsAuthenticatedRedir(Home)}
                        />
                        <Route
                            path="/login"
                            component={userIsNotAuthenticated(Login)}
                        />
                    </Container>
                </Router>
            </Provider>
    );
}

export default App;
