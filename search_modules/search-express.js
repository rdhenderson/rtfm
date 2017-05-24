'use strict'

const osmosis = require('osmosis');
const request = require('request');
const cheerio = require('cheerio');

// Private function that escapes CSS characters and adds leading # to identify ID
function escapeID( myid ) {
  return "#" + myid.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

module.exports = function(id, callback) {
  request('https://expressjs.com/en/4x/api.html',  (err, res, body) => {
    if (err) return callback(err, null)
    const $ = cheerio.load(body);
    let methods = [];

    // If a method name was passed as an id, fetch that section of docs
    // Otherwise, return an array of all method names and corresponding sections
    if (id) {
      var result = $(escapeID(id), '#api-doc')
      methods.push({ name : result.text(), html : result.parent('section').html() });

    } else {
      $("section", '#api-doc').each( (i, elem) =>
        methods.push({
            name : $(elem).children('h3').first().text(),
            html : $(elem).html()
        })
      );
    }

    return callback(err, methods);
  });
}
