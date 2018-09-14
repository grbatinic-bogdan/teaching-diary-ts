import * as React from 'react';
import { Input } from 'reactstrap';
import { WrappedFieldProps } from 'redux-form';

const FormFieldRenderer: React.SFC<WrappedFieldProps> = (props) => {
    const {
        input,
        meta: {
            touched,
            error,
            warning
        },
        ...custom
    } = props;

    return (
        <div>
            <Input {...input}  {...custom} />
            {touched &&
                ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>

    )
}

export default FormFieldRenderer;

/*
export default (props) => {
    const {
        input,
        meta: {
            touched,
            error,
            warning
        },
        ...custom
    } = props;

    return (
        <div>
            <Input {...input}  {...custom} />
            {touched &&
                ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>

    )
}
*/