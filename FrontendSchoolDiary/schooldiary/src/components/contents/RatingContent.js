import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import './../../styles/RatingContent.css';
import { asyncRequestStudentSubjects } from './../../actions/studentsubjects';
import { actionFindStudentSubjects } from './../../actions/find';
import FindForm from './../../forms/findform';

class RatingContent extends Component {
    constructor(props){
        super(props);
        this.getRequestStudentSubjects = this.getRequestStudentSubjects.bind(this);
        this.doFindStr = this.doFindStr.bind(this);
    }
    componentDidMount() {
        this.getRequestStudentSubjects();
    }
    doFindStr(values){
        let strval = typeof values.findval !== 'undefined' ?  values.findval : "";
        this.props.actionFindStudentSubjects(strval);
    }
    getRequestStudentSubjects(){
        this.props.asyncRequestStudentSubjects(this.props.history, this.props.usertoken.items.token);
    }
    render() {
        if (!this.props.studentsubjects[0]) {
            return <div className="RatingContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                <div className="RatingContent-div-main-rating">
                    <div className="RatingContent-div-rating">
                        У Вас нет оценок!
                    </div>
                </div>
            </div>
        }
        return (
            <div className="RatingContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                <div className="RatingContent-div-main-rating">
                    <div className="RatingContent-div-rating">
                        <table className="RatingContent-table-rating">
                            <tbody key="datelist">
                                <tr className="RatingContent-tr-rating">
                                    <td className="RatingContent-td-start">
                                        <div className="RatingContent-div-start"></div>
                                    </td>
                                    {
                                        this.props.studentsubjects[0].matrix.map((item, index) => {
                                            return (
                                                <td className="RatingContent-td-mark" key={"dat"+index}>{item.dateconst.markdata}</td>
                                            )
                                        })
                                    }
                                </tr>
                            </tbody>
                            {
                                this.props.studentsubjects.map((item, index) => {
                                    return (
                                        <tbody key={"subj"+index}>
                                            <tr className="RatingContent-tr-rating">
                                                <td className="RatingContent-td-subject">{item.subject}</td>
                                                {
                                                   item.matrix.map((item_mark, index_mark) => {
                                                        return (
                                                            <td className="RatingContent-td-mark" key={"mark"+index_mark}>{item_mark.dateconst.markvalue}</td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    )
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
        studentsubjects: state.studentsubjects.items.filter(item => item.subject.includes(state.findstudentsubjects)),
        usertoken: state.usertoken
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ asyncRequestStudentSubjects, actionFindStudentSubjects }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(RatingContent));