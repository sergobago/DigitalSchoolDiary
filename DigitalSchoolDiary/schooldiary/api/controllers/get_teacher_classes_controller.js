'use strict';

const winston = require('winston');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const Sequelize = require('sequelize');
const Dedupe = require('array-dedupe');
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

const Op = Sequelize.Op;

module.exports = {
    get_teacherclasses: get_teacherclasses
};

const Teacher = require('./../models/Teacher');
const Subject = require('./../models/Subject');
const Class = require('./../models/Class');
const TeacherClass = require('./../models/TeacherClass');

function get_teacherclasses(req, res) {
    const token = req.headers['jwt-token-x-api-key'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwidXNlcm5hbWUiOiJpc2FiZWxsZW1vbnRnb21lcnkiLCJhc3NvY2lhdGVfaWQiOjEsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNTMwMTg0MjU3LCJleHAiOjE1MzAyOTIyNTd9.NyTCMM04oWzWD3iNav4zVtwbB6_OHOqN9n8OBj3B0Fg";
    if(!token){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", logout: true}]);
    }
    const secret = config_file.get('options.jwt.secret');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", error_code: err.message, logout: true}]);
        }
        if(decoded.role === "teacher"){
            Teacher.findAll({ where: { user_id: decoded.user_id }, include: [{ model: Class, as:"teachers_belongs_to_many_classes", required: true }, { model: Subject, as:"teacher_belongs_to_subject", required: true }] }).then(teachers_data => {
                let arr = [];
                teachers_data.forEach(function(teacher_data) {
                    teacher_data.teachers_belongs_to_many_classes.forEach(function(item) {
                        arr.push({teacher_id: teacher_data.id, class_id: item.id, class_name: item.name, subject_id: teacher_data.teacher_belongs_to_subject.id, subject_name: teacher_data.teacher_belongs_to_subject.name});
                    });
                });
                res.json([{ status: 200, classes: arr }]);
                }).catch(error => {
                    winston.error(error);
                });
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a role teacher!", logout: true}]);
        }
    });
}