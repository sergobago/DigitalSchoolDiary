import React from 'react'
import { reduxForm } from 'redux-form'

const DiaryLogoutForm = props => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit" disabled={submitting}>
                    Logout
                </button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'diary_logout'
})(DiaryLogoutForm)