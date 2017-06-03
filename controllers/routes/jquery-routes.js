
const db = require('../../models');

module.exports = function(app) {

  app.get( '/api/jquery/methods/', ( req, res ) => {
    db.JQueryDoc.findAll().then( (data) => {
      res.send(data);
    }).catch( (err) => console.log(err));
  });

  app.get( '/api/jquery/detail/:id', ( req, res ) => {
    db.JQueryDoc.findOne({
      where: {id: req.params.id}
    }).then( (data) => {
      res.send(data);
    }).catch( (err) => console.log(err));
  });

  app.get( '/api/jquery/search/:query', ( req, res ) => {
    db.JQueryDoc.find({
      where: ['MATCH (detail, name, description) AGAINST(? IN NATURAL LANGUAGE MODE)', [req.params.query]]
    }).then((data) => {
        res.send(data.dataValues);
    }).catch( (err) => console.log(err));
  });
};
