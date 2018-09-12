import * as React from 'react';

import { Field, InjectedFormProps } from 'redux-form';
import { Button, FormGroup, Input } from 'reactstrap';

const renderField = (props: any) => {
    const {
        input,
        ...custom
    } = props;

    return <Input {...input}  {...custom} />
}

interface LoginFormInterface {
    handleSubmit: React.FormEventHandler,
}

/*
const LoginForm: React.SFC<InjectedFormProps> = (props) => {
    const {
        handleSubmit
    } = this.props;

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Field name="email" component={renderField} type="email" placeholder="someone@email.com" />
                </FormGroup>
                <FormGroup>
                    <Field name="password" component={renderField} type="password" placeholder="mysecretpassword" />
                </FormGroup>
                <FormGroup>
                    <Button>Login</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default LoginForm;
*/

export default class LoginForm extends React.Component<InjectedFormProps> {
    render() {
        const {
            handleSubmit
        } = this.props;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Field name="email" component={renderField} type="email" placeholder="someone@email.com" />
                    </FormGroup>
                    <FormGroup>
                        <Field name="password" component={renderField} type="password" placeholder="mysecretpassword" />
                    </FormGroup>
                    <FormGroup>
                        <Button>Login</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}
