// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

// Sets up the Express App
// ==========``===================================================
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));


// Requiring our models for syncing
let db = require("./models");

// Routes =============================================================
require("./controllers/routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    //Uncomment this line to seed database first time
    //Will force an update of database -- FIXME -- NEED MORE ELEGANT SOLUTION.
    // require('./search_modules/search-jquery.js').updateDB();
    console.log("App listening on PORT " + PORT);
  });
});


// app.listen(PORT, function() {
//   //Uncomment this line to seed database first time
//   // require("./db/seeds.js")(db);
//   console.log("App listening on PORT " + PORT);
// });
