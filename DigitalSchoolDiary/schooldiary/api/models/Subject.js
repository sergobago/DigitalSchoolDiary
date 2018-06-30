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
        {
            name: "index_from_subject_unique_name",
            unique: true,
            fields: ['name']
        }
    ],
    timestamps: true,
    underscored: true
};

const Subject = sequelize.define('Subject', schema, options);

module.exports = Subject;