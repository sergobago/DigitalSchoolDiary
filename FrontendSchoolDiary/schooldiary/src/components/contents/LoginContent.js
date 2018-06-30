import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import { asyncRequestDiaryLogin } from './../../actions/login';
import LoginForm from './../../forms/loginform';
import './../../styles/LoginContent.css';

class LoginContent extends Component {
    constructor(props){
        super(props);
        this.requestOnServerDiaryLogin = this.requestOnServerDiaryLogin.bind(this);
    }
    requestOnServerDiaryLogin(values){
        this.props.asyncRequestDiaryLogin(values.username, values.password, this.props.history);
    }
    render() {
        return (
            <div className="LoginContent-div-main">
                {(this.props.usertoken.items.error_name) ? <div className="LoginContent-div-server-error">{this.props.usertoken.items.error_name}</div> : null}
                <div className="LoginContent-div-form">
                    <h1 className="LoginContent-h1-form-title">Login Form</h1>
                    <div className="LoginContent-div-form-login">
                        <LoginForm onSubmit={this.requestOnServerDiaryLogin} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        usertoken: state.usertoken
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ asyncRequestDiaryLogin }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(LoginContent));