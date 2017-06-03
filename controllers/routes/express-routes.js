//Require sequelize models
// const searchFuzzy = require('../../search_modules/search-fuzzy.js');
const db = require('../../models');

module.exports = function(app) {
  //Returns array of objects with name and html keys
  app.get( '/api/express/methods/', ( req, res ) => {
    db.ExpressDoc.findAll().then( (data) => {
      res.send(data);
    }).catch( (err) => console.log(err));
  });

  app.get( '/api/express/detail/:id', ( req, res ) => {
    db.ExpressDoc.findOne({
      where: {id: req.params.id}
    }).then( (data) => {
      res.send(data);
    }).catch( (err) => console.log(err));
  });

  //full text search against html key
  app.get( '/api/express/search/:query', ( req, res ) => {
    db.ExpressDoc.find({
      where: ['MATCH (detail, name) AGAINST(? IN NATURAL LANGUAGE MODE)', [req.params.query]]
    }).then((data) => {
      res.send(data.dataValues);
    }).catch( (err) => console.log(err));
  });

};
  // app.get('/api/express/fuzzy/:query', (req, res) => {
  //   //get method list
  //   searchExpress(null, (err, results) => {
  //     if (err) throw err;
  //     let matches = searchFuzzy(results, req.params.query);
  //     console.log(matches.reduce( (string, elem) => string += elem.item.name + '\n', ''));
  //     res.json(matches);
  //   });
  // });
