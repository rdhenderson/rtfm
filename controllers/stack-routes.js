const stack = require('../search_modules/search-stack.js');

module.exports = function(app) {

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
