import * as React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import { login } from '../../modules/user';
import { InjectedAuthRouterProps } from 'redux-auth-wrapper/history3/redirect';

interface LoginPropsInterface extends InjectedAuthRouterProps {
    login: Function,
    user: any
};

class LoginPage extends React.Component<LoginPropsInterface, {}> {

    constructor(props: LoginPropsInterface) {
        super(props);
        // this.handleSubmit = this.onSubmit.bind(this);
    }

    render() {
        const ReduxedForm = reduxForm({
            form: 'login'
        })(LoginForm);

        return (
            <div>
                <ReduxedForm onSubmit={this.onSubmit.bind(this)} />
                <p>Don't have an account? You can <Link to="/register">register</Link> here</p>
            </div>

        )

    }

    onSubmit(values: any) {
        const {
            email,
            password
        } = values;
        this.props.login(email, password);
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { login })(LoginPage);