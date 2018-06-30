'use strict';

var util = require('util');
const winston = require('winston');
const sequelize = require('./../pgconnect');

const Mark = require('./../models/Mark');
const user_id_value = 3;

module.exports = {
    create_marks: create_marks
};

function create_marks(req, res) {

    Mark.bulkCreate([
        { valuemark: 2, datemark: "2018-06-23 00:00:00.000+03", student_id: user_id_value, teacher_id: 3, subject_id: 1},
        { valuemark: 3, datemark: "2018-06-20 00:00:00.000+03", student_id: user_id_value, teacher_id: 3, subject_id: 2},
        { valuemark: 5, datemark: "2018-06-19 00:00:00.000+03", student_id: user_id_value, teacher_id: 2, subject_id: 3},
        { valuemark: 4, datemark: "2018-06-27 00:00:00.000+03", student_id: user_id_value, teacher_id: 3, subject_id: 1},
        { valuemark: 4, datemark: "2018-06-27 00:00:00.000+03", student_id: user_id_value, teacher_id: 3, subject_id: 3},
        { valuemark: 4, datemark: "2018-06-21 00:00:00.000+03", student_id: user_id_value, teacher_id: 9, subject_id: 4}
    ]).then(() => {
        res.json("Marks successfully created!");
    }).catch(err => {
        winston.error(err);
    });

}