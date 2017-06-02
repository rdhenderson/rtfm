
const path = require('path');
const jqueryDocs = require('../../search_modules/search-jquery.js');

module.exports = function(app) {
  app.get( '/api/jquery/methods/', ( req, res ) => {
    jqueryDocs.getMethods( (err, data ) => {
      if (err) throw err;
      res.send(data);
    });
  });

  app.get( '/api/jquery/detail/:id', ( req, res ) => {
    jqueryDocs.getDetails(req.params.id, ( err, data ) => {
      if ( err ) throw err;
      res.send(data);
    });
  });

  app.get( '/api/jquery/search/:query', ( req, res ) => {
    jqueryDocs.getByName(req.params.query, ( err, data ) => {
      if ( err ) throw err;
      res.send(data);
    });
  });
};
