//Require sequelize models
const path = require('path');
// const db = require("../models");
const jqueryDocs = require('../search_modules/search-jquery.js');

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/test-search.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test-search.html"));
  });

  app.get( '/test-search.html', ( req, res ) => {
    res.sendFile(path.join(__dirname, "../public/test-search.html"));
  });

  //Returns array of objects with name and html keys
  app.get( '/api/jquery/methods/', ( req, res ) => {
    jqueryDocs.getMethods( ( err, data ) => {
      if ( err ) throw err;
      res.send(data);
    });
  });

  require('./express-routes.js')(app);
  require('./stack-routes.js')(app);
  require('./mdn-routes.js')(app);

};
