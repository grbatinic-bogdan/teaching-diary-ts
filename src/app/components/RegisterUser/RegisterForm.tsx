import * as React from 'react';
import { FormGroup, Button, Label } from 'reactstrap';
import { Field, InjectedFormProps } from 'redux-form'

import renderField from '../../services/formFieldRenderer';

const RegisterForm: React.SFC<InjectedFormProps> = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Email</Label>
                <Field name="email" type="email" placeholder="someone@email.com" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Field name="password" type="password" placeholder="yoursecretpassword" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Repat password</Label>
                <Field name="repeatpassword" type="password" placeholder="yoursecretpassword" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>First name</Label>
                <Field name="firstName" type="text" placeholder="Jake" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Last name</Label>
                <Field name="lastName" type="text" placeholder="Smith" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Button>Register</Button>
            </FormGroup>
        </form>
);

export default RegisterForm;

/*
export default ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Email</Label>
                <Field name="email" type="email" placeholder="someone@email.com" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Field name="password" type="password" placeholder="yoursecretpassword" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Repat password</Label>
                <Field name="repeatpassword" type="password" placeholder="yoursecretpassword" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>First name</Label>
                <Field name="firstName" type="text" placeholder="Jake" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Label>Last name</Label>
                <Field name="lastName" type="text" placeholder="Smith" component={renderField} required />
            </FormGroup>
            <FormGroup>
                <Button>Register</Button>
            </FormGroup>
        </form>
    )
}
*/