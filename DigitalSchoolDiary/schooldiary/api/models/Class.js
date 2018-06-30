'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const options = {
    indexes: [

    ],
    timestamps: true,
    underscored: true
};

const Class = sequelize.define('Class', schema, options);

module.exports = Class;