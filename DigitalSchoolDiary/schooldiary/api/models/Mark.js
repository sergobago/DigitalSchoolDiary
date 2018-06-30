'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');

const Student = require('./Student');
const Teacher = require('./Teacher');
const Subject = require('./Subject');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    valuemark: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    datemark: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    }
};

const options = {
    indexes: [
        {
            name: "index_from_mark_unique_ids_student_and_teacher_and_subject_and_date",
            unique: true,
            fields: ['student_id', 'teacher_id', 'subject_id', 'datemark']
        }
    ],
    timestamps: false
};

const Mark = sequelize.define('Mark', schema, options);

Mark.belongsTo(Student, {as: 'mark_belongs_to_student', foreignKey: {name: 'student_id', allowNull:false}, onDelete: 'CASCADE'});
Mark.belongsTo(Teacher, {as: 'mark_belongs_to_teacher', foreignKey: {name: 'teacher_id', allowNull:false}, onDelete: 'CASCADE'});
Mark.belongsTo(Subject, {as: 'mark_belongs_to_subject', foreignKey: {name: 'subject_id', allowNull:false}, onDelete: 'CASCADE'});

module.exports = Mark;