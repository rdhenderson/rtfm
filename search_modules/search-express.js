'use strict';

const request = require('request');
const cheerio = require('cheerio');

// Private function that escapes CSS characters and adds leading # to identify ID
const EXPRESS_BASE_URL = 'https://expressjs.com/en/';
const EXPRESS_API_URL = EXPRESS_BASE_URL + '4x/api.html';

//Create empty methods array
let methods = [];

//Private function to escape special characters ignored by encodeURIComponent
function escapeID( myid ) {
  return myid.toLowerCase().replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

//Private function to query express and call callback function with cheerio object
function queryExpress(url, callback) {
  request(url, (err, res, body) => callback(err, body) );
}

// Takes cheerio/jquery object and return an express method object
function parseExpressSection($el) {
  return {
      name : $el.children('h3').first().text(),
      html : $el.html(),
      shortName: $el.children('h3').first().text().split('(')[0],
      link : $el.children('h3').first().text().split('(')[0].split('.').join("")
  }
}

module.exports = {
  //Return methods previously gathered
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
  getById : function (query, callback) {
    if (methods.length > 0) {
      const match = methods.filter( (el) =>  query.includes(el.shortName) )[0];
      return callback(null, match);
    } else {
      queryURL = EXPRESS_API_URL + '#' + escapeID(id); // Turn res.json into #res\.json
      queryExpress(queryURL, (err, body) => {
        if (err) throw err;
        const $ = cheerio.load(body);
        return callback(null, parseExpressSection($('#'+id)));
      });
    }
  }
}
