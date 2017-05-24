//Require sequelize models
var path = require('path');
let db = require("../models");
let searchMDN = require('../search_modules/search-mdn.js');
const searchStack = require('../search_modules/search-stack.js');
let getMDN = require('../search_modules/get-mdn-page.js');
let searchExpress = require('../search_modules/search-express.js');

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

  app.get( '/api/express/search/:query', function ( req, res ) {
    searchExpress( req.params.query, ( err, results ) => {
      if (err) return console.log(err)
      res.send( results[0].section );
    }
  )
  });

  app.get( '/api/express/methods/', function ( req, res ) {
    searchExpress( null,  ( err, results ) => {
      if ( err ) {
        console.log( err )
        throw err;
      }
      console.log( 'results', results );
      const methods = results.reduce( (string, elem) => string += '<li>' + elem.name + '</li>', '<ul>') + '</ul>';
      res.send(methods);
    });
  });

  app.get('/api/mdn/search/:query', function (req, res) {
    searchMDN(req.params.query, (results) =>
      getMDN(results[0].url + '%24json', (results) =>
        res.json(results)));
  });

  app.get('/api/stack/search/:query', (req, res) => {
    searchStack(req.params.query, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.json(results);
    });
  });
};
