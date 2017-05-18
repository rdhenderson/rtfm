//Get sequelize models
var db = require("./models");

//Set up database name in package.json post-install command
var databaseName = (process.argv[2] || "test");

//Call database check function to confirm DB exists or create it if not.
console.log("Confirming Database Existence");
require('./db/databaseCheck.js')(databaseName);

console.log("Seeding database");
require('./db/seeds.js')();
