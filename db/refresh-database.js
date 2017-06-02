// Requiring our models for syncing
let db = require("../models");

// Syncing our sequelize models and then scraping database
db.sequelize.sync({ force: true }).then(function() {
    //Will force an update of database -- FIXME -- NEED MORE ELEGANT SOLUTION.
    require('../search_modules/search-jquery.js').updateDB();
    require('../search_modules/search-express.js').updateDB();
});
