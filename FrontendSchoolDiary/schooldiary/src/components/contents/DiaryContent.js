import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

import './../../styles/DiaryContent.css';
import { asyncRequestTeacherStudentsMarks, asyncRequestAddMark } from './../../actions/diary';
import { actionFindClassStudents } from './../../actions/find';
import FindForm from './../../forms/findform';
import plus from './../../images/plus.png';

class DiaryContent extends Component {
    constructor(props){
        super(props);
        this.getRequestStudentsMarks = this.getRequestStudentsMarks.bind(this);
        this.doFindStr = this.doFindStr.bind(this);
        this.teacherid = this.props.match.params.teacherid;
        this.classid = this.props.match.params.classid;
        this.subjectid = this.props.match.params.subjectid;
        this.addMark = this.addMark.bind(this);
    }
    componentDidMount() {
        this.getRequestStudentsMarks();
    }
    doFindStr(values){
        let strval = typeof values.findval !== 'undefined' ?  values.findval : "";
        this.props.actionFindClassStudents(strval);
    }
    getRequestStudentsMarks(){
        this.props.asyncRequestTeacherStudentsMarks(this.props.history, this.props.usertoken.items.token, this.teacherid, this.subjectid, this.classid);
    }
    addMark(pcode, pmark, pdate, pstudent){
        console.log(pcode + " " + pmark + " " + pdate + " " + pstudent);
        this.props.asyncRequestAddMark(this.props.history, this.props.usertoken.items.token, this.teacherid, this.subjectid, this.classid, pcode, pmark, pdate, pstudent)
    }
    render() {
        if (!this.props.diary[0]) {
            return <div className="DiaryContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                </div>
        }
        return (
            <div className="DiaryContent-div-main">
                <FindForm onSubmit={this.doFindStr}/>
                <div className="DiaryContent-div-main-rating">
                    <div className="DiaryContent-div-rating">
                        <table className="DiaryContent-table-rating">
                            <tbody key="datelist">
                            <tr className="DiaryContent-tr-rating">
                                <td className="DiaryContent-td-start">
                                    <div className="DiaryContent-div-start"></div>
                                </td>
                                <td className="DiaryContent-td-start-mini">
                                    <div className="DiaryContent-div-start-mini">Add Mark</div>
                                </td>
                                {
                                    this.props.diary[0].matrix.map((item, index) => {
                                        return (
                                            <td className="DiaryContent-td-date" key={"dat"+index}>{item.dateconst.markdata}</td>
                                        )
                                    })
                                }
                            </tr>
                            </tbody>
                            {
                                this.props.diary.map((item, index) => {
                                    return (
                                        <tbody key={"subj"+index}>
                                            <tr className="DiaryContent-tr-rating">
                                                <td className="DiaryContent-td-student">{item.subject}</td>
                                                <td className="DiaryContent-td-student-mini">
                                                    <span className="top-menu">
                                                        <ul>
                                                            <li className="DiaryContent-li-block">
                                                                <img src={plus} className="DiaryContent-img-add" />
                                                                <ul className="DiaryContent-menu-ul">
                                                                    <li className="DiaryContent-menu-li" onClick={() => this.addMark(-1, 2, Date(), item.student_id)}>2</li>
                                                                    <li className="DiaryContent-menu-li" onClick={() => this.addMark(-1, 3, Date(), item.student_id)}>3</li>
                                                                    <li className="DiaryContent-menu-li" onClick={() => this.addMark(-1, 4, Date(), item.student_id)}>4</li>
                                                                    <li className="DiaryContent-menu-li" onClick={() => this.addMark(-1, 5, Date(), item.student_id)}>5</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </td>
                                                {
                                                    item.matrix.map((item_mark, index_mark) => {
                                                        return (
                                                            <td className="DiaryContent-td-mark" key={"mark"+index_mark}>
                                                                <span className="top-menu">
                                                                    <ul>
                                                                        <li className="DiaryContent-li-block">
                                                                            <div className="DiaryContent-int">&nbsp;{item_mark.dateconst.markvalue}</div>
                                                                            <ul className="DiaryContent-menu-ul">
                                                                                <li className="DiaryContent-menu-li" onClick={() => this.addMark(item_mark.dateconst.markcode, 2, item_mark.dateconst.markfulldate, item_mark.dateconst.student_id)}>2</li>
                                                                                <li className="DiaryContent-menu-li" onClick={() => this.addMark(item_mark.dateconst.markcode, 3, item_mark.dateconst.markfulldate, item_mark.dateconst.student_id)}>3</li>
                                                                                <li className="DiaryContent-menu-li" onClick={() => this.addMark(item_mark.dateconst.markcode, 4, item_mark.dateconst.markfulldate, item_mark.dateconst.student_id)}>4</li>
                                                                                <li className="DiaryContent-menu-li" onClick={() => this.addMark(item_mark.dateconst.markcode, 5, item_mark.dateconst.markfulldate, item_mark.dateconst.student_id)}>5</li>
                                                                            </ul>
                                                                        </li>
                                                                    </ul>
                                                                </span>
                                                            </td>
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
        diary: state.diary.items.filter(item => item.subject.includes(state.finddiary)),
        usertoken: state.usertoken
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ asyncRequestTeacherStudentsMarks, actionFindClassStudents, asyncRequestAddMark }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(DiaryContent));