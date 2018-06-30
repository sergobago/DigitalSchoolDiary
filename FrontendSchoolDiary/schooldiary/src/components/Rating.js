import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Template from './template';
import RatingContent from './contents/RatingContent';

class Rating extends Component {
    componentDidMount() {
        if(!this.props.usertoken.isResultedRequest){
            return this.props.history.push('/login');
        }else if(this.props.usertoken.items.role !== "student"){
            return this.props.history.push('/lk');
        }
    }
    render() {
        return (
            <Template>
                <RatingContent/>
            </Template>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        usertoken: state.usertoken
    };
}

export default withRouter(connect(mapStateToProps)(Rating));