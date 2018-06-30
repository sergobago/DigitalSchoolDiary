'use strict';

const winston = require('winston');
const jwt = require('jsonwebtoken');
const config_file = require('config');
const Sequelize = require('sequelize');
const dateFormat = require('dateformat');
const Dedupe = require('array-dedupe');
const arraySort = require('array-sort');
const arrayoperations = require("array-operations");
const sequelize = require('./../pgconnect');
const axiosheader = require('./../axiosheader');

const Op = Sequelize.Op;

module.exports = {
    get_studentrating: get_studentrating
};

const Mark = require('./../models/Mark');
const Subject = require('./../models/Subject');

function get_studentrating(req, res) {
    const token = req.headers['jwt-token-x-api-key'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imxlb3N0ZXdhcnQiLCJhc3NvY2lhdGVfaWQiOjEsImNsYXNzX2lkIjoxLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTUzMDEwOTY0MCwiZXhwIjoxNTMwMjE3NjQwfQ.grL9yB_OrNvFB5ZALSHDbYQgKciN7oY3pApZrJSZW2Y";
    if(!token){
        return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", logout: true}]);
    }
    const secret = config_file.get('options.jwt.secret');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.json([{status: 400, description: 'Bad Parametrs', error_name: "You are not logged in!", error_code: err.message, logout: true}]);
        }
        if(decoded.role === "student"){
            Mark.findAll({ where: { student_id: decoded.associate_id }, include: [{ model: Subject, as:"mark_belongs_to_subject", required: true }] }).then(marks_data => {
                let marks = [];
                let subjects = [];
                let years = [];
                marks_data.forEach(function(mark_data) {
                    let dateval = dateFormat(new Date(mark_data.datemark), "dd.mm.yyyy");
                    const payload = {
                        [mark_data.mark_belongs_to_subject.name]: [{[dateval]: {markvalue: mark_data.valuemark} }]
                    };
                    marks.push(payload);
                    subjects.push(mark_data.mark_belongs_to_subject.name);
                    years.push({dateval: dateval});
                });
                subjects = arrayoperations.removeDuplicates(subjects);
                years = arraySort(years, 'dateval');
                years = Dedupe(years, ['dateval']);
                let base_marks = [];
                for (let ind_subject = 0; ind_subject < subjects.length; ++ind_subject) {
                    let subj = subjects[ind_subject];
                    let subj_arr = [];
                        for (let ind_date = 0; ind_date < years.length; ++ind_date) {
                            let dater = years[ind_date].dateval;
                            let stat_added = true;
                            for (let ind_mark = 0; ind_mark < marks.length; ++ind_mark) {
                                if(marks[ind_mark][subj]){
                                    if(marks[ind_mark][subj][0][dater]){
                                        subj_arr.push({dateconst: {markvalue: marks[ind_mark][subj][0][dater].markvalue, markdata: dater}});
                                        stat_added = false;
                                    }
                                }
                             }
                            if(stat_added){
                                subj_arr.push({dateconst: {markvalue: "", markdata: dater}});
                            }
                        }
                    base_marks.push({subject: subj, matrix: subj_arr});
                    }
                //const item_marks = {subjects: subjects, dates: years, marks: base_marks};
                res.json([{ status: 200, item_marks: base_marks }]);
            }).catch(error => {
                winston.error(error);
            });
        }else{
            res.json([{status: 400, description: 'Bad Parametrs', error_name: "You do not have a role student!", logout: true}]);
        }
    });
}