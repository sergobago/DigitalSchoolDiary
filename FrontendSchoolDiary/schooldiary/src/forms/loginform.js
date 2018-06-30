import React from 'react'
import { Field, reduxForm } from 'redux-form'

import './../styles/LoginForm.css';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required!'
    } else if (values.username.length > 64) {
        errors.username = 'Must be 64 characters or less!'
    }else if (values.username.length < 4) {
        errors.username = 'Must be 4 characters or more!'
    }
    if (!values.password) {
        errors.password = 'Required!'
    } else if (values.password.length > 64) {
        errors.password = 'Must be 64 characters or less!'
    }else if (values.password.length < 4) {
        errors.password = 'Must be 4 characters or more!'
    }
    return errors
};

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
    }) => (
    <div>
        <label className="LoginForm-label">{label}</label>
        <div className="LoginForm-div-form">
            <input {...input} placeholder={label} type={type} className="LoginForm-input" />
            <br/>
            {touched &&
            ((error && <span className="LoginForm-error">{error}</span>) ||
            (warning && <span className="LoginForm-warning">{warning}</span>))}
        </div>
    </div>
);

const DiaryLoginForm = props => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
            />
            <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
            />
            <div className="LoginForm-div-button">
                <button type="submit" disabled={submitting} className="LoginForm-button">
                    Login
                </button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'diary_login',
    validate,
    initialValues: {
        username: 'abigailhudson',
        password: '171356651q1'
    }
})(DiaryLoginForm)