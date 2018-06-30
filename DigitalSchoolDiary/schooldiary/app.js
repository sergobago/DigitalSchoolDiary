'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var session = require('express-session');
var config_file = require('config');
var winston = require('winston');
var cookieParser = require('cookie-parser');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var Sequelize = require('sequelize');

var app = express();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  var sequelize = new Sequelize(
      config_file.get('options.sequelize.bd'),
      config_file.get('options.sequelize.login'),
      config_file.get('options.sequelize.password'),
      config_file.get('options.sequelize.params'));

  var sequlizeStore = new SequelizeStore({
    db: sequelize
  });

  app.use(cookieParser());
  app.use(session({
    secret: 'hihadhidhygfgfdadeadtaedfefed87138',
    store: sequlizeStore,
    cookie: { maxAge: 12 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
  }));

  //sequlizeStore.sync({force: true, logging: console.log});

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || config_file.get('options.serverSettings.port');
  app.listen(port, config_file.get('options.serverSettings.host'));

  /*if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }*/

  winston.configure({
    transports: [
      new (winston.transports.Console)(config_file.get('options.winstonSettings.consoleInfo')),
      new (winston.transports.File)(config_file.get('options.winstonSettings.fileInfo')),
      new (winston.transports.File)(config_file.get('options.winstonSettings.fileError'))
    ]
  });

});
