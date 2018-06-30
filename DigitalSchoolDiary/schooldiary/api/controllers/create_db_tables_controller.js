'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
const winston = require('winston');
const sequelize = require('./../pgconnect');

const User = require('./../models/User');
const TeacherClass = require('./../models/TeacherClass');
const Class = require('./../models/Class');
const Subject = require('./../models/Subject');
const Student = require('./../models/Student');
const Teacher = require('./../models/Teacher');
const Mark = require('./../models/Mark');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  create_dbtables: create_dbtables
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function create_dbtables(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

  //var name = req.swagger.params.name.value || 'stranger';
  //var hello = util.format('Hello, %s!', name);

  User.sync({force: true, logging: console.log}).then(function(){
    TeacherClass.sync({force: true, logging: console.log}).then(function(){
      Class.sync({force: true, logging: console.log}).then(function(){
        Subject.sync({force: true, logging: console.log}).then(function(){
          Student.sync({force: true, logging: console.log}).then(function(){
            Teacher.sync({force: true, logging: console.log}).then(function(){
              Mark.sync({force: true, logging: console.log}).then(function(){
                Class.bulkCreate([{ name: "5-A"}, { name: "5-B"}, { name: "5-C"}]).then(() => {
                  Subject.bulkCreate([{ name: "Mathematics"}, { name: "Russian language"}, { name: "Physics"}, { name: "History"}, { name: "Chemistry"}]).then(() => {
                    User.bulkCreate([
                      { name: "Leo Stewart", username: "leostewart", password: "93s187", address: "Voronezh, st. Krasnoznamenskaya, bld. 1", phone:"+79121001001" },
                      { name: "Aaron Jordan", username: "aaronjordan", password: "8316f873", address: "Voronezh, st. Krasnoznamenskaya, bld. 2", phone:"+79121001002" },
                      { name: "Harley Reynolds", username: "harleyreynolds", password: "83s1782", address: "Voronezh, st. Krasnoznamenskaya, bld. 3", phone:"+79121001003" },
                      { name: "Connor Robinson", username: "connorrobinson", password: "6831g537", address: "Voronezh, st. Krasnoznamenskaya, bld. 4", phone:"+79121001004" },
                      { name: "Joseph Butler", username: "josephbutler", password: "87317h534", address: "Voronezh, st. Krasnoznamenskaya, bld. 5", phone:"+79121001005" },
                      { name: "Grady Cotton", username: "gradycotton", password: "9813s5667376", address: "Voronezh, st. Krasnoznamenskaya, bld. 6", phone:"+79121001006" },
                      { name: "Braiden Hurst", username: "braidenhurst", password: "815357a18738", address: "Voronezh, st. Krasnoznamenskaya, bld. 7", phone:"+79121001007" },
                      { name: "Dante Randall", username: "danterandall", password: "9012s83167", address: "Voronezh, st. Krasnoznamenskaya, bld. 8", phone:"+79121001008" },
                      { name: "William Leach", username: "williamleach", password: "s091613623", address: "Voronezh, st. Krasnoznamenskaya, bld. 9", phone:"+79121001009" },
                      { name: "Archer Bartlett", username: "archerbartlett", password: "9813315r45", address: "Voronezh, st. Krasnoznamenskaya, bld. 10", phone:"+79121001010" },
                      { name: "Rachel Harper", username: "rachelharper", password: "8137381877a831", address: "Voronezh, st. Krasnoznamenskaya, bld. 11", phone:"+79121001011" },
                      { name: "Megan Green", username: "megangreen", password: "18713713831uads", address: "Voronezh, st. Krasnoznamenskaya, bld. 12", phone:"+79121001012" },
                      { name: "Julia Phillips", username: "juliaphillips", password: "2878f32788", address: "Voronezh, st. Krasnoznamenskaya, bld. 13", phone:"+79121001013" },
                      { name: "Courtney Berry", username: "courtneyberry", password: "9116s31356", address: "Voronezh, st. Krasnoznamenskaya, bld. 14", phone:"+79121001014" },
                      { name: "Gracie Murphy", username: "graciemurphy", password: "127713767e13", address: "Voronezh, st. Krasnoznamenskaya, bld. 15", phone:"+79121001015" }
                    ], {individualHooks: true}).then(() => {
                      User.bulkCreate([
                        { name: "Jasmine Rosales", username: "jasminerosales", password: "187381t1378", address: "Voronezh, st. Krasnoznamenskaya, bld. 16", phone:"+79121001016" },
                        { name: "Abigail Hudson", username: "abigailhudson", password: "171356651q1", address: "Voronezh, st. Krasnoznamenskaya, bld. 17", phone:"+79121001017" },
                        { name: "Isabelle Montgomery", username: "isabellemontgomery", password: "915361536e1723", address: "Voronezh, st. Krasnoznamenskaya, bld. 18", phone:"+79121001018" },
                        { name: "Carmen Collins", username: "carmencollins", password: "98716365w123", address: "Voronezh, st. Krasnoznamenskaya, bld. 19", phone:"+79121001019" },
                        { name: "Malia Dominguez", username: "maliadominguez", password: "916737r136", address: "Voronezh, st. Krasnoznamenskaya, bld. 20", phone:"+79121001020" }
                      ], {individualHooks: true}).then(() => {
                        Student.bulkCreate([
                          { class_id: 1, user_id: 1 },
                          { class_id: 1, user_id: 2 },
                          { class_id: 1, user_id: 3 },
                          { class_id: 1, user_id: 4 },
                          { class_id: 1, user_id: 5 },
                          { class_id: 2, user_id: 6 },
                          { class_id: 2, user_id: 7 },
                          { class_id: 2, user_id: 8 },
                          { class_id: 2, user_id: 9 },
                          { class_id: 2, user_id: 10 },
                          { class_id: 3, user_id: 11 },
                          { class_id: 3, user_id: 12 },
                          { class_id: 3, user_id: 13 },
                          { class_id: 3, user_id: 14 },
                          { class_id: 3, user_id: 15 }
                        ]).then(() => {
                          Teacher.bulkCreate([
                            { subject_id: 1, user_id: 16 },
                            { subject_id: 3, user_id: 17 },
                            { subject_id: 2, user_id: 18 },
                            { subject_id: 4, user_id: 19 },
                            { subject_id: 5, user_id: 20 },
                            { subject_id: 2, user_id: 16 },
                            { subject_id: 5, user_id: 18 },
                            { subject_id: 3, user_id: 19 },
                            { subject_id: 4, user_id: 17 }
                          ]).then(() => {
                            TeacherClass.bulkCreate([
                              { teacher_id: 1, class_id: 1 },
                              { teacher_id: 3, class_id: 1 },
                              { teacher_id: 8, class_id: 1 },
                              { teacher_id: 5, class_id: 1 },
                              { teacher_id: 2, class_id: 1 },
                              { teacher_id: 2, class_id: 2 },
                              { teacher_id: 9, class_id: 2 },
                              { teacher_id: 5, class_id: 2 },
                              { teacher_id: 3, class_id: 2 },
                              { teacher_id: 7, class_id: 2 },
                              { teacher_id: 4, class_id: 2 },
                              { teacher_id: 5, class_id: 3 },
                              { teacher_id: 6, class_id: 3 },
                              { teacher_id: 8, class_id: 3 },
                              { teacher_id: 1, class_id: 3 },
                              { teacher_id: 3, class_id: 3 }
                            ]).then(() => {
                              res.json("Tables successfully created and filled with data!");
                            }).catch(err => {
                              winston.error(err);
                            });
                          }).catch(err => {
                            winston.error(err);
                          });
                        }).catch(err => {
                          winston.error(err);
                        });
                      }).catch(err => {
                        winston.error(err);
                      });
                    }).catch(err => {
                      winston.error(err);
                    });
                  }).catch(err => {
                    winston.error(err);
                  });
                }).catch(err => {
                  winston.error(err);
                });
              }, function(err){
                winston.error(err);
              });
            }, function(err){
              winston.error(err);
            });
          }, function(err){
            winston.error(err);
          });
        }, function(err){
          winston.error(err);
        });
      }, function(err){
        winston.error(err);
      });
    }, function(err){
      winston.error(err);
    });
  }, function(err){
    winston.error(err);
  });

}
