//Require sequelize models
let db = require("../models");
let path = require('path');
let searchMDN = require('../search_modules/search-mdn.js');
let getMDN = require('../search_modules/get-mdn-page.js')

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get('/api/mdn/search/:query', function (req, res) {
    searchMDN(req.params.query, (results) =>
      getMDN(results[0].url + '%24json', (results) =>
        res.json(results)));
  });

  app.get('/api/stack/search/:query'), (req, res) => {
    searchStack(req.params.query, (results) => console.log(results));
  });

  app.post('/api/burger', function(req, res) {
    // db.Burger.create(req.body).then((dbPost) => res.json(dbPost));
  });

  app.put('/api/burger', function(req, res) {
    // db.Burger.update(req.body, {where : { id : req.body.id}})
    // .then((dbPost) => res.json(dbPost));
    res.json()
  });

  app.delete('/api/burger/:id', function(req,res) {
    // db.Burger.destroy({where : {id: req.params.id}}).then((results) => res.json(results));
  });
};
