import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter, Link } from 'react-router-dom';

import './../../styles/Header.css';
import logo from './../../images/newlogo.jpg';
import { actionUserDataLogout } from './../../actions/logout';
import { asyncRequestGetUserData } from './../../actions/userdata';

class HeaderLogin extends Component {
    constructor(props){
        super(props);
        this.doDiaryLogout = this.doDiaryLogout.bind(this);
        this.getRequestUserData = this.getRequestUserData.bind(this);
    }
    componentDidMount() {
        this.getRequestUserData();
    }
    doDiaryLogout(){
        this.props.actionUserDataLogout(this.props.history);
    }
    getRequestUserData(){
        this.props.asyncRequestGetUserData(this.props.history, this.props.usertoken.items.token);
    }
    render() {
        return (
            <div className="Header-main-block">
                <div className="Header-div-logo">
                    <img src={logo} className="Header-logo"/>
                </div>
                <div className="Header-div-sitename">
                    <Link to="/" className="Header-link-without-style"><h1 className="Header-h1-sitename">React x Redux</h1></Link>
                </div>
                {
                    this.props.usertoken.items.role === "student" ?
                        <span>
                            <Link to="/rating" className="Header-link-without-style">
                                <div className="Header-div-btn-left">
                                    Rating
                                </div>
                            </Link>
                            <Link to="/classmates" className="Header-link-without-style">
                                <div className="Header-div-btn-left">
                                    Classmates
                                </div>
                            </Link>
                        </span>
                        :
                        <span>
                            <Link to="/classes" className="Header-link-without-style">
                                <div className="Header-div-btn-left">
                                    Classes
                                </div>
                            </Link>
                        </span>
                }
                <div className="Header-div-btn-right" onClick={this.doDiaryLogout}>
                    Logout
                </div>
                <div className="Header-div-name-right">
                    <Link to="/lk" className="Header-link-without-style"><p className="Header-name">{this.props.userdata.items.name}</p></Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        usertoken: state.usertoken,
        userdata: state.userdata
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ actionUserDataLogout, asyncRequestGetUserData }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(HeaderLogin));