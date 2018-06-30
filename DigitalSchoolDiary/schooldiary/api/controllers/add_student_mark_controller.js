'use strict';

const winston = require('winston');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const Sequelize = require('sequelize');
const dateFormat = require('dateformat');
const validator = require('validator');
const Dedupe = require('array-dedupe');
const arraySort = require('array-sort');
const arrayoperations = require("array-operations");
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

const Op = Sequelize.Op;

module.exports = {
    add_studentmark: add_studentmark
};

const Mark = require('./../models/Mark');
const Subject = require('./../models/Subject');
const Class = require('./../models/Class');
const Teacher = require('./../models/Teacher');
const User = require('./../models/User');
const Student = require('./../models/Student');

//http://localhost:3000/addstudentmark?teacherid=2&subjectid=3&classid=1&code=15&pdate=2018-06-28T16:01:54.017Z&mark=2
function add_studentmark(req, res) {
    const token = req.headers['jwt-token-x-api-key'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywidXNlcm5hbWUiOiJhYmlnYWlsaHVkc29uIiwiYXNzb2NpYXRlX2lkIjoyLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTUzMDE5ODIwNiwiZXhwIjoxNTMwMzA2MjA2fQ.obK4BoEodR8sVNidMIPgVRCvA5BnpbLkyfCDr3yIAh8";
    if(!token){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", logout: true}]);
    }
    var teacherid = req.swagger.params.teacherid.value;
    var subjectid = req.swagger.params.subjectid.value;
    var classid = req.swagger.params.classid.value;
    var pcode = req.swagger.params.code.value;
    var pmark = req.swagger.params.mark.value;
    var pdate = req.swagger.params.pdate.value;
    var pstudent = req.swagger.params.student.value;
    teacherid = validator.trim(validator.escape(teacherid));
    subjectid = validator.trim(validator.escape(subjectid));
    classid = validator.trim(validator.escape(classid));
    pcode = validator.trim(validator.escape(pcode));
    pmark = validator.trim(validator.escape(pmark));
    pdate = validator.trim(validator.escape(pdate));
    pstudent = validator.trim(validator.escape(pstudent));
    var validator_error_value = null;
    validator_error_value = validator_func({teacherid: teacherid, subjectid: subjectid, classid: classid, pcode: pcode, pmark: pmark, pdate: pdate, pstudent: pstudent});
    if(validator_error_value){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "Bad Parametrs!", logout: true}]);
    }
    const secret = config_file.get('options.jwt.secret');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", error_code: err.message, logout: true}]);
        }
        if(decoded.role === "teacher"){
            Teacher.findOne({ where: { id: teacherid, subject_id: subjectid } }).then(teacher_data => {
                if(teacher_data){
                    if(teacher_data.user_id === decoded.user_id){
                        Mark.findOne({ where: { id: pcode } }).then(mark_exist => {
                            if(mark_exist){
                                Mark.update({ valuemark: pmark}, {where: { id: pcode }}).then(() => {
                                    resuler(req, res, teacherid, subjectid, classid, pcode, pmark, pdate, pstudent, token);
                                }).catch(err => {
                                    winston.error(err);
                                });
                            }else{
                                Mark.findOne({ where: { datemark: pdate, student_id: pstudent, teacher_id: teacherid, subject_id: subjectid } }).then(mark2_exist => {
                                    if(mark2_exist){
                                        resuler(req, res, teacherid, subjectid, classid, pcode, pmark, pdate, pstudent, token);
                                    }else{
                                        Mark.create({ valuemark: pmark, student_id: pstudent, teacher_id: teacherid, subject_id: subjectid}).then(() => {
                                            resuler(req, res, teacherid, subjectid, classid, pcode, pmark, pdate, pstudent, token);
                                        }).catch(err => {
                                            winston.error(err);
                                        });
                                    }
                                }).catch(error => {
                                    winston.error(error);
                                });
                            }
                        }).catch(error => {
                            winston.error(error);
                        });
                    }else{
                        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged user!", logout: true}]);
                    }
                }else{
                    return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not teacher with subject!", logout: true}]);
                }
            }).catch(error => {
                winston.error(error);
            });
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a role teacher!", logout: true}]);
        }
    });
}

function validator_func(validator_array) {
    var error_val = null;
    //isEmpty
    switch(true) {
        case validator.isEmpty(validator_array.teacherid):
            error_val = "teacherid can not be empty!";
            break;
        case validator.isEmpty(validator_array.subjectid):
            error_val = "subjectid can not be empty!";
            break;
        case validator.isEmpty(validator_array.classid):
            error_val = "classid can not be empty!";
            break;
        case validator.isEmpty(validator_array.pcode):
            error_val = "pcode can not be empty!";
            break;
        case validator.isEmpty(validator_array.pmark):
            error_val = "pmark can not be empty!";
            break;
        case validator.isEmpty(validator_array.pdate):
            error_val = "pdate can not be empty!";
            break;
        case validator.isEmpty(validator_array.pstudent):
            error_val = "pstudent can not be empty!";
            break;
    }
    //isLength
    switch(false) {
        case validator.isInt(validator_array.teacherid):
            error_val = "teacherid is not an integer!";
            break;
        case validator.isInt(validator_array.subjectid):
            error_val = "subjectid is not an integer!";
            break;
        case validator.isInt(validator_array.classid):
            error_val = "classid is not an integer!";
            break;
        case validator.isInt(validator_array.pmark):
            error_val = "pmark is not an integer!";
            break;
        case validator.isInt(validator_array.pcode):
            error_val = "pcode is not an integer!";
            break;
        case validator.isInt(validator_array.pstudent):
            error_val = "pstudent is not an integer!";
            break;
    }
    return error_val;
}

function resuler(req, res, teacherid, subjectid, classid, pcode, pmark, pdate, pstudent, token) {
    Student.findAll({ where: { class_id: classid }, include: [{ model: User, as:"student_belongs_to_user", required: true }] }).then(studs_data => {
        let students_names = [];
        studs_data.forEach(function(stud_data) {
            students_names.push({studentid: stud_data.id, name: stud_data.student_belongs_to_user.name});
        });
        Mark.findAll({ where: { teacher_id: teacherid, subject_id: subjectid }, include: [{ model: Student, where: { class_id: classid }, as:"mark_belongs_to_student", required: false, include: [{ model: User, as:"student_belongs_to_user", required: true }] }] }).then(marks_data => {
            let base_marks = [];
            if(marks_data) {
                //console.log(marks_data);
                let marks = [];
                let dates = [];
                marks_data.forEach(function (mark_data) {
                    if(mark_data){
                        if(mark_data.mark_belongs_to_student){
                            if(mark_data.mark_belongs_to_student.student_belongs_to_user){
                                let dateval = dateFormat(new Date(mark_data.datemark), "dd.mm.yyyy");
                                let namer = mark_data.mark_belongs_to_student.student_belongs_to_user.name;
                                marks.push({
                                    [namer]: [{
                                        [dateval]: {
                                            markvalue: mark_data.valuemark,
                                            markcode: mark_data.id,
                                            markdate: mark_data.datemark
                                        }
                                    }]
                                });
                                students_names.push({
                                    studentid: mark_data.mark_belongs_to_student.id,
                                    name: namer
                                });
                                dates.push({dateval: dateval, fulldate: mark_data.datemark});
                            }
                        }
                    }
                });
                students_names = Dedupe(students_names, ['name']);
                dates = arraySort(dates, 'dateval');
                dates = Dedupe(dates, ['dateval']);
                //let base_marks = [];
                for (let ind_subject = 0; ind_subject < students_names.length; ++ind_subject) {
                    let subj = students_names[ind_subject].name;
                    let studid = students_names[ind_subject].studentid;
                    let subj_arr = [];
                    for (let ind_date = 0; ind_date < dates.length; ++ind_date) {
                        let dater = dates[ind_date].dateval;
                        let fulldater = dates[ind_date].fulldate;
                        let stat_added = true;
                        for (let ind_mark = 0; ind_mark < marks.length; ++ind_mark) {
                            if (marks[ind_mark][subj]) {
                                if (marks[ind_mark][subj][0][dater]) {
                                    subj_arr.push({
                                        dateconst: {
                                            markvalue: marks[ind_mark][subj][0][dater].markvalue,
                                            markcode: marks[ind_mark][subj][0][dater].markcode,
                                            markdata: dater,
                                            markfulldate: marks[ind_mark][subj][0][dater].markdate,
                                            student_id: studid,
                                            student_name: subj
                                        }
                                    });
                                    stat_added = false;
                                }
                            }
                        }
                        if (stat_added) {
                            subj_arr.push({
                                dateconst: {
                                    markvalue: "",
                                    markcode: -1,
                                    markdata: dater,
                                    markfulldate: fulldater,
                                    student_id: studid,
                                    student_name: subj
                                }
                            });
                        }
                    }
                    base_marks.push({subject: subj, student_id: studid, matrix: subj_arr});
                }
            }else{
                console.log("net");
            }
            res.json([{ status: 200, item_marks: base_marks }]);
        }).catch(error => {
            winston.error(error);
        });
    }).catch(error => {
        winston.error(error);
    });
}