const stack = require('../../search_modules/search-stack.js');

module.exports = function(app) {

  app.get('/api/stack/search/:query/:language', (req, res) => {
    stack.search(req.params.query, req.params.language, (err, results) => {
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
};
