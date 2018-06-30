import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Template from './template';
import MainLKContent from './contents/MainLKContent';

class Lk extends Component {
    componentDidMount() {
        if(!this.props.usertoken.isResultedRequest){
            return this.props.history.push('/login');
        }
    }
    render() {
        return (
            <Template>
                <MainLKContent/>
            </Template>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        usertoken: state.usertoken
    };
}

export default withRouter(connect(mapStateToProps)(Lk));