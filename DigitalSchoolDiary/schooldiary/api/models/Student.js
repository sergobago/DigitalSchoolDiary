'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');

const User = require('./User');
const Class = require('./Class');

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

    ],
    timestamps: true,
    underscored: true
};

const Student = sequelize.define('Student', schema, options);

Student.belongsTo(Class, {as: 'student_belongs_to_class', foreignKey: {name: 'class_id', allowNull:false}, onDelete: 'CASCADE'});
Student.belongsTo(User, {as: 'student_belongs_to_user', foreignKey: {name: 'user_id', allowNull:false}, onDelete: 'CASCADE'});

module.exports = Student;