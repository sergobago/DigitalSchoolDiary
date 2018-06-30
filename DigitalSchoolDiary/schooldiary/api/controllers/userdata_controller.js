'use strict';

const winston = require('winston');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

module.exports = {
    get_userdata: get_userdata
};

const User = require('./../models/User');
const Teacher = require('./../models/Teacher');
const Student = require('./../models/Student');

function get_userdata(req, res) {
    const token = req.headers['jwt-token-x-api-key'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imxlb3N0ZXdhcnQiLCJhc3NvY2lhdGVfaWQiOjEsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNTI5ODM5MjE5LCJleHAiOjE1Mjk4NDEwMTl9.nbMkSfC690YQIqk6oRPVqK-B42dHJYYSjaIQox1s5LU";
    if(!token){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", logout: true}]);
    }
    const secret = config_file.get('options.jwt.secret');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", error_code: err.message, logout: true}]);
        }
        if(decoded.role === "student"){
            Student.findOne({ where: { user_id: decoded.user_id }, include: [{ model: User, as:"student_belongs_to_user", required: true }] }).then(student_data => {
                const payload = {
                    name: student_data.student_belongs_to_user.name,
                    address: student_data.student_belongs_to_user.address,
                    phone: student_data.student_belongs_to_user.phone,
                    role: "student"
                };
                res.json([{ status: 200, userdata: payload }]);
            }).catch(error => {
                winston.error(error);
            });
        }else if(decoded.role === "teacher"){
            Teacher.findOne({ where: { user_id: decoded.user_id }, include: [{ model: User, as:"teacher_belongs_to_user", required: true }] }).then(teacher_data => {
                const payload = {
                    name: teacher_data.teacher_belongs_to_user.name,
                    address: teacher_data.teacher_belongs_to_user.address,
                    phone: teacher_data.teacher_belongs_to_user.phone,
                    role: "teacher"
                };
                res.json([{ status: 200, userdata: payload }]);
            }).catch(error => {
                winston.error(error);
            });
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a role!", logout: true}]);
        }
    });
}