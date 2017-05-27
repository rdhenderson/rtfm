//Require sequelize models
const path = require('path');
const db = require("../models");
const searchMDN = require('../search_modules/search-mdn.js');
const stack = require('../search_modules/search-stack.js');
const getMDN = require('../search_modules/get-mdn-page.js');
const searchExpress = require('../search_modules/search-express.js');
const searchFuzzy = require('../search_modules/search-fuzzy.js');

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
  app.get( '/api/express/methods/', ( req, res ) => {
    searchExpress.fetchAPI( ( err, results ) => {
      if ( err ) throw err;
      res.send(results);
    });
  });

  app.get( '/api/express/search/:query', ( req, res ) => {
    searchExpress.getById(req.params.query, ( err, results ) => {
      if (err) return console.log(err);
      res.json ( results );
    });
  });

  // app.get('/api/express/fuzzy/:query', (req, res) => {
  //   //get method list
  //   searchExpress(null, (err, results) => {
  //     if (err) throw err;
  //     let matches = searchFuzzy(results, req.params.query);
  //     console.log(matches.reduce( (string, elem) => string += elem.item.name + '\n', ''));
  //     res.json(matches);
  //   });
  // });


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

  app.get('/api/stack/question/:id?', (req, res) => {
    const id = (req.params.id || req.body.ids );
    stack.getAnswers(id, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });


};
