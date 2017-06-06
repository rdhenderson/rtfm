'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    // console.log("model names: ", model.name);

    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Declare Custom Association
// db.ExpressDoc.belongsToMany(db.User, {through: 'Bookmark'});
// db.JQueryDoc.belongsToMany(db.User, {through: 'user_jquery',as: 'Method'});
User.belongsToMany(models.ExpressDoc, { through: "Bookmark"});
ExpressDoc.belongsToMany(models.User, { through: "Bookmark"});

// db.User.belongsToMany(db.ExpressDoc,  {through: "docs"});

// db.User.hasMany(db.JQueryDoc, {through: 'userJQuery', as: 'Method'});

module.exports = db;
