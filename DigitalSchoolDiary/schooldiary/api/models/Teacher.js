'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');

const User = require('./User');
const Subject = require('./Subject');
const Class = require('./Class');
const TeacherClass = require('./TeacherClass');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
};

const options = {
    indexes: [
        {
            name: "index_from_teacher_unique_ids_user_and_subject",
            unique: true,
            fields: ['user_id', 'subject_id']
        }
    ],
    timestamps: true,
    underscored: true
};

const Teacher = sequelize.define('Teacher', schema, options);

Teacher.belongsTo(User, {as: 'teacher_belongs_to_user', foreignKey: {name: 'user_id', allowNull:false}, onDelete: 'CASCADE'});
Teacher.belongsTo(Subject, {as: 'teacher_belongs_to_subject', foreignKey: {name: 'subject_id', allowNull:false}, onDelete: 'CASCADE'});
Teacher.belongsToMany(Class, {through: TeacherClass, as: 'teachers_belongs_to_many_classes', foreignKey: {name: 'teacher_id', allowNull:false}, otherKey: {name: 'class_id', allowNull:false}});

module.exports = Teacher;