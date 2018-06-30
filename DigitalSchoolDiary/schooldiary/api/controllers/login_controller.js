'use strict';

const winston = require('winston');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

const User = require('./../models/User');
const Teacher = require('./../models/Teacher');
const Student = require('./../models/Student');

module.exports = {
    do_login: do_login
};

//http://localhost:3000/login?username=leostewart&password=93s187
function do_login(req, res) {
    var username = req.swagger.params.username.value;
    var password = req.swagger.params.password.value;
    username = validator.trim(validator.escape(username)).toLowerCase();
    password = validator.trim(validator.escape(password));
    var validator_error_value = null;
    validator_error_value = validator_func({username: username, password: password});
    if(validator_error_value){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: validator_error_value}]);
    }
    User.findOne({ where: {username: username} }).then(user_data => {
        if(user_data){
            user_data.comparePassword(password, function(err, isMatch) {
                if(err) throw new Error(err);
                if(isMatch){
                    Teacher.findOne({ where: {user_id: user_data.id} }).then(teacher_data => {
                        Student.findOne({ where: {user_id: user_data.id} }).then(student_data => {
                            if(teacher_data || student_data){
                                let payload = {};
                                if(teacher_data) {
                                    payload = {
                                        user_id: user_data.id,
                                        username: user_data.username,
                                        associate_id: teacher_data.id,
                                        role: "teacher"
                                    };
                                } else if(student_data) {
                                    payload = {
                                        user_id: user_data.id,
                                        username: user_data.username,
                                        associate_id: student_data.id,
                                        class_id: student_data.class_id,
                                        role: "student"
                                    };
                                }
                                const options = {
                                    expiresIn: '30h'
                                };
                                const secret = config_file.get('options.jwt.secret');
                                jwt.sign(payload, secret, options, (err, token) => {
                                    const tokendata = {
                                        role: payload.role,
                                        token: token
                                    };
                                    res.json([{ status: 200, description: 'Login completed!', tokendata: tokendata }]);
                                });
                            }else{
                                res.json([{status: 400, description: 'Bad Parametrs', error_name: "User does not have a role!"}]);
                            }
                        }).catch(error => {
                            winston.error(error);
                        });
                    }).catch(error => {
                        winston.error(error);
                    });
                }else{
                    res.json([{status: 400, description: 'Bad Parametrs', error_name: "Wrong username or password!"}]);
                }
            });
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "Wrong username or password!"}]);
        }
    }).catch(error => {
        winston.error(error);
    });
}

function validator_func(validator_array) {
    var error_val = null;
    //isEmpty
    switch(true) {
        case validator.isEmpty(validator_array.username):
            error_val = "Username can not be empty!";
            break;
        case validator.isEmpty(validator_array.password):
            error_val = "Password can not be empty!";
            break;
    }
    //isLength
    switch(false) {
        case validator.isLength(validator_array.username, {min: 3, max: 64}):
            error_val = "Username must contain from 3 to 64 characters!";
            break;
        case validator.isLength(validator_array.password, {min: 4, max: 32}):
            error_val = "Password must contain from 4 to 32 characters!";
            break;
    }
    return error_val;
}