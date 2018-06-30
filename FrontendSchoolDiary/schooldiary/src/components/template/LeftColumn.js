import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './../../styles/LeftColumn.css';
import BlockClock from './../columnblocks/BlockClock';
import BlockAds from './../columnblocks/BlockAds';

class LeftColumn extends Component {
    render() {
        return (
            <div className="LeftColumn-main-block">
                <BlockClock/>
                <BlockAds/>
            </div>
        );
    }
}

export default withRouter(LeftColumn);