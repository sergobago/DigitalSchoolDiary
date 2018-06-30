import React from 'react'
import { Field, reduxForm } from 'redux-form'

import './../styles/FindForm.css';

const renderField = ({
    input,
    placeholder,
    type
    }) => (
    <input {...input} type={type} placeholder={placeholder} className="FindForm-input" />
);

const FindForm = props => {
    const { handleSubmit, submitting, standart } = props;
    return (
        <div className="FindForm-div-main">
            <div className="FindForm-div-form">
                <form onSubmit={handleSubmit}>
                    <Field
                        name="findval"
                        type="text"
                        component={renderField}
                        placeholder="Search"
                    />
                    <button type="submit" disabled={submitting} className="FindForm-button">Find</button>
                </form>
            </div>
        </div>
    )
};

export default reduxForm({form: 'find_form'})(FindForm)