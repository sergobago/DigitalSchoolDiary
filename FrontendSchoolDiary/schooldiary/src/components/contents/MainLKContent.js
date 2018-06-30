import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import './../../styles/MainLKContent.css';

class MainLKContent extends Component {
    render() {
        if (!this.props.userdata.items.name) {
            return <div/>
        }
        return (
            <div className="MainLKContent-div-main">
                <h3 className="MainLKContent-h3-logged">{this.props.userdata.items.name}. You are logged!</h3>
                <p className="MainLKContent-p-info">Address: {this.props.userdata.items.address}</p>
                <p className="MainLKContent-p-info">Phone: {this.props.userdata.items.phone}</p>
                <p className="MainLKContent-p-info">Role: {this.props.userdata.items.role}</p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        userdata: state.userdata
    };
}

export default withRouter(connect(mapStateToProps)(MainLKContent));