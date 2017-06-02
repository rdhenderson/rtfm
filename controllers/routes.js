
const path = require('path');

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // FIXME: Add index.js to routes/ so we can just require folder like sequelize models?
  require('./routes/express-routes.js')(app);
  require('./routes/jquery-routes.js')(app);
  require('./routes/stack-routes.js')(app);
  require('./routes/mdn-routes.js')(app);
};
