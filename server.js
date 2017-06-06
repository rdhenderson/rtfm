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

// let User = require('./models').User;

// Routes =============================================================
require("./controllers/routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    //Uncomment this line to seed database first time
    //Will force an update of database -- FIXME -- NEED MORE ELEGANT SOLUTION.
    // require('./search_modules/search-jquery.js').updateDB();
    console.log("App listening on PORT " + PORT);

    //DB Testing:
    // const User_id = "7e284b7c-82bc-4b0e-a5fe-58258f70d9d2";
    // for( var key in db.User) {
    //   // if (db.User.hasOwnProperty(key))
    //
    //    if (key.includes('set'))  console.log('db.User.' + key);
    // }

    console.log('Associations: ', db.ExpressDoc.associations);
    // db.User.setBookmarks( {UserId: User_id, ExpressDocId : 1})
    // db.User.create({username: "Bob", role: 'user'})
    // db.ExpressDoc.getUser({where: {id:1}})
    // const type = $("#language-select option:selected").val();
    // .then( (results) => console.log("posted", results) );

  });
});


// app.listen(PORT, function() {
//   //Uncomment this line to seed database first time
//   // require("./db/seeds.js")(db);
//   console.log("App listening on PORT " + PORT);
// });
