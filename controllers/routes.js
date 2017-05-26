//Require sequelize models
var path = require('path');
let db = require("../models");
let searchMDN = require('../search_modules/search-mdn.js');
const stack = require('../search_modules/search-stack.js');
let getMDN = require('../search_modules/get-mdn-page.js');
let searchExpress = require('../search_modules/search-express.js');
const searchFuzzy = require('../search_modules/search-fuzzy.js');
const fs = require('fs');

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/test-search.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test-search.html"));
  });

  app.get( '/api/express/search/:query', ( req, res ) => {

    searchExpress( req.params.query, ( err, results ) => {
      // console.log('results', results);
      if (err) return console.log(err)
      return res.json( results[0] );

      // // TEMPORARY TO WRITE HTML RESULTS FOR TESTING PURPOSES
      // fs.writeFile("./express-response.html", results[0].html,  (err) => {
      //   if(err) return console.log(err);
      //
      //   console.log("The file was saved!");
      // });
    });
  });

  app.get( '/test-search.html', ( req, res ) => {
    res.sendFile(path.join(__dirname, "../public/test-search.html"));
  });

  //Returns array of objects with name and html keys
  app.get( '/api/express/methods/', ( req, res ) => {
    searchExpress( null,  ( err, results ) => {
      if ( err ) throw err;
      res.send(results);
    });
  });

  //Queries MDN and requests a JSON response
  app.get('/api/mdn/search/:query', (req, res) => {
    searchMDN(req.params.query, (results) =>
      getMDN(results[0].url + '%24json', (results) =>
        res.json(results)));
  });

  app.get('/api/stack/search/:query', (req, res) => {
    stack.search(req.params.query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.get('/api/stack/question/:id', (req, res) => {
    stack.getAnswers(req.params.id, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.get('/api/express/fuzzy/:query', (req, res) => {
    //get method list
    searchExpress(null, (err, results) => {
      if (err) throw err;
      let matches = searchFuzzy(results, req.params.query);
      console.log(matches.reduce( (string, elem) => string += elem.item.name + '\n', ''));
      res.json(matches);
    });
  });

};
