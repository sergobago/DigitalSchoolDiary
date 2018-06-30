import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './../../styles/Header.css';
import logo from './../../images/newlogo.jpg';

class HeaderVisitor extends Component {
    render() {
        return (
            <div className="Header-main-block">
                <div className="Header-div-logo">
                    <img src={logo} className="Header-logo"/>
                </div>
                <div className="Header-div-sitename">
                    <Link to="/" className="Header-link-without-style"><h1 className="Header-h1-sitename">React x Redux</h1></Link>
                </div>
                <Link to="/login" className="Header-link-without-style">
                    <div className="Header-div-btn-right">
                        Login
                    </div>
                </Link>
            </div>
        );
    }
}

export default withRouter(HeaderVisitor);