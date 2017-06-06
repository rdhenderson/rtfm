
const path = require('path');
const db = require('../models');

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.post("/api/user", function(req, res) {
    db.User.upsert(req.body)
    .then ( (results) => res.send(results.dataValues.id) );
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.post("/api/bookmark", function(req, res) {
    db.Bookmark.create(req.body)
    .then ( (results) => res.send(results) )
    .catch( (err) => {
      console.log("ERROR: ", err);
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });
});

  app.get("/api/bookmarks/:id", function(req,res) {
    db.User.getMethod({where: {id: req.params.id}})
      .then( (results) => res.send(results) );
  });

  // FIXME: Add index.js to routes/ so we can just require folder like sequelize models?
  // Documentation resources should be implemented as instances of a class or sub-classes
  require('./routes/express-routes.js')(app);
  require('./routes/jquery-routes.js')(app);
  require('./routes/stack-routes.js')(app);
  require('./routes/mdn-routes.js')(app);
  require('./routes/star-routes.js')(app);
};
