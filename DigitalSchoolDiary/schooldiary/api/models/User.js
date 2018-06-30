'use strict';

const sequelize = require('./../pgconnect');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const config_file = require('config');

//const Student = require('./Student');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4,64]
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const options = {
    indexes: [
        {
            name: "index_from_user_unique_name",
            unique: true,
            fields: ['name']
        },
        {
            name: "index_from_user_unique_username",
            unique: true,
            fields: ['username']
        }
    ],
    timestamps: true,
    underscored: true
};

const User = sequelize.define('User', schema, options);

User.beforeCreate(function(instance, options) {
    return cryptPassword(instance.password).then(success => {
        instance.password = success;
}).catch(err => {

    });
});

User.beforeBulkCreate(function(instances, options) {
    return instances.forEach(function (instance) {
        return cryptPassword(instance.password).then(success => {
            instance.password = success;
        }).catch(err => {

        });
    });
});

User.beforeUpdate(function(instance, options) {
    if (instance.changed('password')) {
        return cryptPassword(instance.password).then(success => {
            instance.password = success;
    })
    .catch(err => {

        });
    }
});

function cryptPassword(password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(config_file.get('options.genSalt.password'), function (err, salt) {
            // Encrypt password using bycrpt module
            if (err) return reject(err);

            bcrypt.hash(password, salt, null, function (err, hash) {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    });
}

User.prototype.comparePassword = function(candidatePassword, cb) {
    var user = this;
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = User;