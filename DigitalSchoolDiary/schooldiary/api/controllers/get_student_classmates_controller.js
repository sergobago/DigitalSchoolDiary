'use strict';

const winston = require('winston');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const Sequelize = require('sequelize');
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

const Op = Sequelize.Op;

module.exports = {
    get_studentclassmates: get_studentclassmates
};

const Student = require('./../models/Student');
const User = require('./../models/User');

function get_studentclassmates(req, res) {
    const token = req.headers['jwt-token-x-api-key'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imxlb3N0ZXdhcnQiLCJhc3NvY2lhdGVfaWQiOjEsImNsYXNzX2lkIjoxLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTUzMDAxMjAyMCwiZXhwIjoxNTMwMDEzODIwfQ.R2BCn0_qmFAbITxUDGaiBaIwiz4S1iheJfMEa051GZ4";
    if(!token){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", logout: true}]);
    }
    const secret = config_file.get('options.jwt.secret');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", error_code: err.message, logout: true}]);
        }
        if(decoded.role === "student"){
            if(decoded.class_id){
                Student.findAll({ where: { class_id: decoded.class_id, id: {[Op.ne]: decoded.associate_id} }, include: [{ model: User, as:"student_belongs_to_user", required: true }] }).then(students_data => {
                    let classmates = [];
                    students_data.forEach(function(student_data) {
                        const payload = {
                            name: student_data.student_belongs_to_user.name,
                            phone: student_data.student_belongs_to_user.phone
                        };
                        classmates.push(payload);
                    });
                    res.json([{ status: 200, classmates: classmates }]);
                }).catch(error => {
                    winston.error(error);
                });
            }else{
                res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a class!", logout: true}]);
            }
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a role student!", logout: true}]);
        }
    });
}