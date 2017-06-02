//Require sequelize models
const mdn = require('../../search_modules/search-mdn.js');

module.exports = function(app) {
  //Queries MDN and requests a JSON response
  app.get('/api/mdn/get/', (req, res) => {
    let url = encodeURI('https://developer.mozilla.org/en-US/docs/Glossary/jQuery');
    mdn.getPage(url, (results) =>
        res.send(results));
  });

  //Queries MDN and requests a JSON response
  app.get('/api/mdn/search/:query', (req, res) => {
    mdn.search(req.params.query, (results) => {
        res.send(results);
    });
  });
};
