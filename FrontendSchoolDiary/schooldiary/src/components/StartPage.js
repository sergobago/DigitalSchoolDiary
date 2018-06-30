import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Template from './template';
import StartPageContent from './contents/StartPageContent';

class StartPage extends Component {
    render() {
        return (
            <Template>
                <StartPageContent/>
            </Template>
        );
    }
}

export default withRouter(StartPage);