'use strict'

const osmosis = require('osmosis');
const request = require('request');
const cheerio = require('cheerio');

//Sends query to MDN and returns responding articles
//Returns an array of objects  {title: x, description: x, url: x}
function searchAndParseMDN (query, callback) {
  osmosis
      .get('https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(query))
      // .find('.search-results-container')
      .find('.result-list')
      .set({'url': ['.result-list-item']})
      .data(function(data) {
        var formattedResults = data.url.map((el) => {
          let result = el.split('\n');
          return { 'title' : result[0].trim(), 'description' : result[1].trim(), 'url' : result[2].trim() };
        });
        // formattedResults.forEach((el) => console.log(el));
        return (callback) ? callback(formattedResults) : formattedResults;
  });
}
// function searchAndParseMDNCheerio (query, callback) {
//   const queryURL = 'https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(query);
//   request(queryURL, (err, res, body) =>
//       if (err) throw err;
//       const $ = cheerio.load(body);
//       let responses = [];
//       $('.result-list').find('.result-list-item').children('a').eq(0)
//         responses.push({
//           url : $(el).first().text();
//
//         })
//       }
//     )
//       .set({'url': ['.result-list-item']})
//       .data(function(data) {
//         var formattedResults = data.url.map((el) => {
//           let result = el.split('\n');
//           return { 'title' : result[0].trim(), 'description' : result[1].trim(), 'url' : result[2].trim() };
//         });
//         // formattedResults.forEach((el) => console.log(el));
//         return (callback) ? callback(formattedResults) : formattedResults;
//   });
// }
// Information on MDN document parameters here:
// https://developer.mozilla.org/en-US/docs/MDN/Contribute/Tools/Document_parameters
function getPage(url, callback) {
  console.log('url', url);
  request(url,  (err, res, body) => {
    if (err) throw err;
    console.log(body);
    return parseMDNWiki(body, callback);
  });
}

function parseMDNWiki (body, callback) {
  const $ = cheerio.load(body);
  let wikiHead = $('#wiki-document-head');
  let wikiContent = $('#wiki-content');
  console.log('head', wikiHead);
  return callback({name: wikiHead.html(), html : wikiContent.html()})
}


module.exports = {
  search : searchAndParseMDN,
  getPage : getPage
};
