//Require sequelize models
//var db = require("../models");
var path = require('path');

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
  });

  // app.get('/api/search', function (req, res) {
  //     // db.Burger.findAll().then((results) => res.json(results))
  // });
  //
  // app.post('/api/burger', function(req, res) {
  //   // db.Burger.create(req.body).then((dbPost) => res.json(dbPost));
  // });
  //
  // app.put('/api/burger', function(req, res) {
  //   // db.Burger.update(req.body, {where : { id : req.body.id}})
  //   // .then((dbPost) => res.json(dbPost));
  // });
  //
  // app.delete('/api/burger/:id', function(req,res) {
  //   // db.Burger.destroy({where : {id: req.params.id}}).then((results) => res.json(results));
  // });
};
