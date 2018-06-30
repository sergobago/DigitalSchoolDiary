import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import './../../styles/ClassmatesContent.css';
import { asyncRequestClassmates } from './../../actions/classmates';
import { actionFindClassmates } from './../../actions/find';
import FindForm from './../../forms/findform';
import classmates from './../../images/classmates.png';

class ClassmatesContent extends Component {
    constructor(props){
        super(props);
        this.getRequestClassmates = this.getRequestClassmates.bind(this);
        this.doFindStr = this.doFindStr.bind(this);
        this.doAlert = this.doAlert.bind(this);
    }
    componentDidMount() {
        this.getRequestClassmates();
    }
    doFindStr(values){
        let strval = typeof values.findval !== 'undefined' ?  values.findval : "";
        this.props.actionFindClassmates(strval);
    }
    getRequestClassmates(){
        this.props.asyncRequestClassmates(this.props.history, this.props.usertoken.items.token);
    }
    doAlert(nameval, phoneval){
        alert(nameval + ": " + phoneval);
    }
    render() {
        if (!this.props.classmates[0]) {
            return <div className="ClassmatesContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
            </div>
        }
        return (
            <div className="ClassmatesContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                <div className="ClassmatesContent-div-main-classmates">
                    <div className="ClassmatesContent-div-classmates">
                        <table className="ClassmatesContent-table-classmates">
                            {
                                this.props.classmates.map((item, index) => {
                                    return (<tbody key={index} onClick={() => this.doAlert(item.name, item.phone)}>
                                            <tr className="ClassmatesContent-tr-classmates">
                                                <td className="ClassmatesContent-td-classmates">
                                                    <img src={classmates} className="ClassmatesContent-img-classmates" />
                                                </td>
                                                <td className="ClassmatesContent-td-classmates">{item.name}</td>
                                                <td className="ClassmatesContent-td-classmates ClassmatesContent-td-classmates-phone">{item.phone}</td>
                                            </tr>
                                        </tbody>)
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        classmates: state.classmates.items.filter(item => item.name.includes(state.findclassmates)),
        usertoken: state.usertoken
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ asyncRequestClassmates, actionFindClassmates }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ClassmatesContent));