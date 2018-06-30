import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import './../../styles/ClassesContent.css';
import { asyncRequestClasses } from './../../actions/classes';
import { actionFindClasses } from './../../actions/find';
import FindForm from './../../forms/findform';
import classmates from './../../images/classmates.png';
import { getVisibleTodosClasses } from "./../../selectors/classes";

class ClassesContent extends Component {
    constructor(props){
        super(props);
        this.getRequestClasses = this.getRequestClasses.bind(this);
        this.doFindStr = this.doFindStr.bind(this);
        this.doClass = this.doClass.bind(this);
    }
    componentDidMount() {
        this.getRequestClasses();
    }
    doFindStr(values){
        let strval = typeof values.findval !== 'undefined' ?  values.findval : "";
        this.props.actionFindClasses(strval);
    }
    getRequestClasses(){
        this.props.asyncRequestClasses(this.props.history, this.props.usertoken.items.token);
    }
    doClass(idteacher, idsubject, idclass){
        this.props.history.push("/diary/" + idteacher + "/" + idsubject + "/" + idclass);
    }
    render() {
        if (!this.props.classes[0]) {
            return <div className="ClassesContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                </div>
        }
        return (
            <div className="ClassesContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                <div className="ClassesContent-div-main-classes">
                    <div className="ClassesContent-div-classes">
                        <table className="ClassesContent-table-classes">
                            {
                                this.props.classes.map((item, index) => {
                                    return (<tbody key={index} onClick={() => this.doClass(item.teacher_id, item.subject_id, item.class_id)}>
                                    <tr className="ClassesContent-tr-classes">
                                        <td className="ClassesContent-td-classes">{item.class_name}: {item.subject_name}</td>
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

const getVisibleTodos2 = (todos, filt) => {
    const mas = todos.items.filter(item => item.class_name.includes(filt));
    console.log(mas);
    console.log("kak");
    return mas;
};

/*function mapStateToProps(state, ownProps){
    return {
        //classes: state.classes.items.filter(item => item.class_name.includes(state.findclasses)),
        classes: getVisibleTodos2(state.classes, state.findclasses),
        usertoken: state.usertoken
    };
}*/

const mapStateToProps = (state, ownProps) => {
    return {
        classes: getVisibleTodosClasses(state),
        usertoken: state.usertoken
    };
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({ asyncRequestClasses, actionFindClasses }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ClassesContent));