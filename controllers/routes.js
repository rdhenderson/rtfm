//Require sequelize models
var path = require('path');
let db = require("../models");
let path = require('path');
let searchMDN = require('../search_modules/search-mdn.js');
let getMDN = require('../search_modules/get-mdn-page.js')

module.exports = function(app) {

  app.get("/", function(req, res) {
    // var queryURL = "https://api.stackexchange.com/2.2/search?" +  "order=desc&sort=activity&site=stackoverflow";
    //
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).done(function(res){
    //
    //   console.log(res);
    // })
    res.end("It worked!");

    // res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get('/api/mdn/search/:query', function (req, res) {
    searchMDN(req.params.query, (results) =>
      getMDN(results[0].url + '%24json', (results) =>
        res.json(results)));
  });

  app.get('/api/stack/search/:query'), (req, res) => {
    //

  });
};
