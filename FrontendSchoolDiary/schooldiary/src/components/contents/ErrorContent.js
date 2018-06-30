import React, { Component } from 'react';

import './../../styles/ErrorContent.css';

class ErrorContent extends Component {
    render() {
        return (
            <div className="ErrorContent-div-main">
                <p className="ErrorContent-message">Error 404</p>
            </div>
        );
    }
}

export default ErrorContent;