import React, { Component } from 'react';

import './../../styles/LeftColumn.css';
import jino from './../../images/hosting.png';

class BlockAds extends Component {
    render() {
        return (
            <div className="LeftColumn-column-block">
                <p className="LeftColumn-column-block-name">Advertising:</p>
                <a href="http://jino.ru/" target="_blank">
                    <img src={jino} className="LeftColumn-column-block-img"/>
                </a>
            </div>
        );
    }
}

export default BlockAds;