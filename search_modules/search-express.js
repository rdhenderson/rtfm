'use strict';

const request = require('request');
const cheerio = require('cheerio');

// Private function that escapes CSS characters and adds leading # to identify ID
const EXPRESS_BASE_URL = 'https://expressjs.com/en/';
const EXPRESS_API_URL = EXPRESS_BASE_URL + '4x/api.html';

//Create empty methods array
let methods = [];

function escapeID( myid ) {
  return "#" + myid.toLowerCase().replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

//Private function to query express and call callback function with cheerio object
function queryExpress(url, callback) {
  request(url, (err, res, body) => callback(err, body) );
}
// Takes cheerio object and return a method object
function parseExpressSection($elem) {
  return {
      name : $elem.children('h3').first().text(),
      html : $elem.html(),
      shortName: $elem.children('h3').first().text().split('(')[0],
      link : $elem.children('h3').first().text().split('(')[0].split('.').join("")
  }
}

module.exports = {
  methods : function () {
    return methods;
  },
  fetchAPI : function (callback) {
      let queryURL = EXPRESS_API_URL;
      queryExpress(queryURL, (err, body) => {
        if (err) return console.err(err);
        //Load response html into cheerio for jquery-style manipulation
        const $ = cheerio.load(body);
        //Add each section within api-doc as object to methods
        $("section", '#api-doc').each( (i, elem) => {
          methods.push(parseExpressSection($(elem)));
        });

        return callback(null, methods);
    });
  },
  getById : function (id, callback) {
    if (methods.length !== 0) {
      const match = methods.filter( (el) => el.shortName === id || el.name === id )[0];
      console.log('match = ', match);
      return callback(null, match);

    } else {
      queryURL = EXPRESS_API_URL + escapeID(id);
      queryExpress(queryURL, (err, body) => {
        if (err) throw err;
        const $ = cheerio.load(body);
        return callback(err, parseExpressSection($('#'+id)));
      });
    }
  }
}
