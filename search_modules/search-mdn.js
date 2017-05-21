'use strict'

const osmosis = require('osmosis');

//Sends query to MDN and returns responding articles
//Returns an array of objects  {title: x, description: x, url: x}
module.exports = (query, callback) => {
  console.log('query', query)
  osmosis
      .get('https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(query))
      // .find('.search-results-container')
      .find('.result-list')
      .set({'url': ['.result-list-item']})
      .data(function(data) {
        var formattedResults = data.url.map((el) => {
          let result = el.split('\n');
          return { 'title' : result[0].trim(), 'description' : result[1].trim(), 'url' : 'https://' + result[2].trim() };
        });

        // formattedResults.forEach((el) => console.log(el));
        return (callback) ? callback(formattedResults) : formattedResults;
  });
}
