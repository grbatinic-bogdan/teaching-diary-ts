import * as React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import { Alert } from 'reactstrap';
import { register } from '../../modules/user';
import { InjectedAuthRouterProps } from 'redux-auth-wrapper/history3/redirect';

interface IProps extends InjectedAuthRouterProps {
    hasRegistered: boolean,
    register: Function
}

class RegisterUser extends React.Component<IProps> {
    render() {
        const RegisterFormRedux = reduxForm({
            form: 'register',
            validate: this.validate.bind(this)
        })(RegisterForm);

        const {
            hasRegistered
        } = this.props

        return (
            <div>
                <h1>Register</h1>
                {hasRegistered && <Alert color="success">You have successfully registered! You can <Link to="/login">login</Link> using your new email and password</Alert>}
                <RegisterFormRedux onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }

    onSubmit(values: any) {
        this.props.register(values);
    }

    validate(values: any) {
        interface IValidationErrors {
            [propName: string]: string;
        };
        const errors: IValidationErrors = {};
        const {
            password,
            repeatpassword
        } = values;

        if (password && repeatpassword) {
            if (password !== repeatpassword) {
                errors.password = 'Passwords do not match';
                errors.repeatpassword = 'Passwords do not match';
            }
        }

        return errors;
    }
}

const mapStateToProps = (state: any) => {
    const {
        user: {
            register: {
                hasRegistered
            }
        }
    } = state;

    return {
        hasRegistered
    }
}

export default connect(mapStateToProps, { register })(RegisterUser);