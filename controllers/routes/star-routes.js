
const db = require('../../models');
const tableSelect = {
  'express' : db.ExpressDoc,
  'jquery'  : db.JQueryDoc
};

module.exports = function(app) {

  // app.post( '/api/star/:table/:id/', ( req, res ) => {
  //   const id = req.params.id;
  //   const table = req.params.table;
  //   // db.Star.create({doc_id: id, doc_type: table})
  //     .then(db.Star.findAll())
  //     .then( (results) => {
  //       console.log(results);
  //       res.send(results);
  //     }).catch( (err) => console.log(err));
  // });

  // app.get( '/api/jquery/detail/:id', ( req, res ) => {
  //   db.JQueryDoc.findOne({
  //     where: {id: req.params.id}
  //   }).then( (data) => {
  //     res.send(data);
  //   }).catch( (err) => console.log(err));
  // });
  //
  // app.get( '/api/jquery/search/:query', ( req, res ) => {
  //   db.JQueryDoc.find({
  //     where: ['MATCH (detail, name, description) AGAINST(? IN NATURAL LANGUAGE MODE)', [req.params.query]]
  //   }).then((data) => {
  //       res.send(data.dataValues);
  //   }).catch( (err) => console.log(err));
  // });
};
