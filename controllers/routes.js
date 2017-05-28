//Require sequelize models
const path = require('path');
// const db = require("../models");

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

  require('./express-routes.js')(app);
  require('./stack-routes.js')(app);
  require('./mdn-routes.js')(app);

};
