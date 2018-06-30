import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Template from './template';
import ErrorContent from './contents/ErrorContent';

class StartPage extends Component {
    render() {
        return (
            <Template>
                <ErrorContent/>
            </Template>
        );
    }
}

export default withRouter(StartPage);