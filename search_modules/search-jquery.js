'use strict';

const request = require('request');
const cheerio = require('cheerio');

// Private function that escapes CSS characters and adds leading # to identify ID
const JQUERY_API_URL = 'https://api.jquery.com/';

//Create empty methods array
let methods = [];

//Private function to query express and call callback function with cheerio object
function queryJquery (url, callback) {
  request(url, (err, res, body) => callback(err, body) );
}

// Takes cheerio/jquery object and return an express method object
function parseJqueryAPIList($el) {
  return {
      name : $el.children('a:first-child').text() || "error",
      href : $el.children('a:first-child').attr('href'),
      html : $el.parent().next().html()
  }
}

module.exports = {
  //Return methods previously gathered
  methods : function () {
    return methods;
  },
  fetchAPI : function (callback) {
      let queryURL = JQUERY_API_URL;
      queryJquery(queryURL, (err, body) => {
        if (err) return console.err(err);
        //Load response html into cheerio for jquery-style manipulation
        const $ = cheerio.load(body);
        //Add each section within api-doc as object to methods
        $(".entry-title").each( (i, el) => {
          const item = parseJqueryAPIList($(el));
          item.id = `jquery-${i}`;
          methods.push(item);
        });
        return callback(null, methods);
    });
  },
  getById : function (href, callback) {
    queryURL = 'https:' + href; // Turn res.json into #res\.json
    queryJquery(queryURL, (err, body) => {
      if (err) throw err;
      const $ = cheerio.load(body);
      //return callback(err, response);
    });
  }
};
