'use strict';

const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

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
      shortName: $el.children('h3').first().text().split('(')[0],
      html : $el.html(),
      link : $el.children('h3').first().text().split('(')[0].split('.').join("")
  };
}

function fetchAPI (callback) {
    let queryURL = EXPRESS_API_URL;
    queryExpress(queryURL, (err, body) => {
      if (err) return console.err(err);
      //Load response html into cheerio for jquery-style manipulation
      const $ = cheerio.load(body);
      //Add each section within api-doc as object to methods
      $('table').attr('class', 'table');
      $('thead').attr('class', 'thead-inverse');

      $("section", '#api-doc').each( (i, elem) => {
        methods.push(parseExpressSection($(elem)));
      });

      // Add methods to database, retrieve and send to callback
      db.ExpressDoc.bulkCreate(methods)
        .then(() => db.ExpressDoc.findAll())
        .then((data) => callback(null, data));
  });
}
module.exports = {
  //Return methods previously gathered
  getMethods : function (callback) {
    if (methods.length) return callback(methods);
    db.ExpressDoc.findAll()
    .then( (data) => {
      methods = data;
      if (data.length) return callback(null, data);
      return fetchAPI(callback);
    })
    .catch( (err) => console.err(err));
  },
  // Force an update to database
  updateDB : function (callback) {
    return fetchAPI(callback);
  },
  getById : function (query, callback) {
    db.ExpressDoc.findAll().then( (data) => {
      //FIXME: NEED ERROR HANDLING FOR BAD SEARCH OR EMPTY DB
      const match = methods.filter( (el) =>  query.includes(el.shortName))[0];
      return callback(null, match);
      // EXPRESS_API_URL + '#' + escapeID(id); // Turn res.json into #res\.json
      // queryExpress(queryURL, (err, body) => {
      //   if (err) throw err;
      //   const $ = cheerio.load(body);
      //   return callback(null, parseExpressSection($('#'+id)));
      // });
    });
  }
};
