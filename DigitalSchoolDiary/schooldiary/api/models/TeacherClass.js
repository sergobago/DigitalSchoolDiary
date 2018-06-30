'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');

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

const TeacherClass = sequelize.define('TeacherClass', schema, options);

module.exports = TeacherClass;