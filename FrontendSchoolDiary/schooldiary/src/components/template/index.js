import React, { Component } from 'react';
import {connect} from 'react-redux';

import './../../styles/Template.css';
import HeaderVisitor from './HeaderVisitor';
import HeaderLogin from './HeaderLogin';
import LeftColumn from './LeftColumn';
import Footer from './Footer';

class Template extends Component {
    render() {
        return (
            <div className="Template-main-block">
                { this.props.usertoken.isResultedRequest ? <HeaderLogin/> : <HeaderVisitor/>}
                <div className="Template-body-block">
                    <LeftColumn/>
                    <div className="Template-content-block">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        usertoken: state.usertoken
    };
}

export default connect(mapStateToProps)(Template);