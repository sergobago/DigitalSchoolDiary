'use strict';
const Sequelize = require('sequelize');
const config_file_sequelize = require('config');

const sequelize = new Sequelize(
    config_file_sequelize.get('options.sequelize.bd'),
    config_file_sequelize.get('options.sequelize.login'),
    config_file_sequelize.get('options.sequelize.password'),
    config_file_sequelize.get('options.sequelize.params'));

module.exports = sequelize;