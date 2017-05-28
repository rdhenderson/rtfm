//Require sequelize models
const searchExpress = require('../search_modules/search-express.js');
const searchFuzzy = require('../search_modules/search-fuzzy.js');

module.exports = function(app) {

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
      res.send ( results );
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

};
