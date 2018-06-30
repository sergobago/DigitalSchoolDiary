import React, { Component } from 'react';

import './../../styles/Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="Footer-main-block">
                <div className="Footer-author-block">
                    <p className="Footer-author-text">Website © 2018 - {(new Date().getFullYear())}. All rights reserved.</p>
                </div>
            </div>
        );
    }
}

export default Footer;