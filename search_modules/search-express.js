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
      detail : $el.html(),
      link : $el.children('h3').first().text().split('(')[0].split('.').join("")
  };
}

function fetchAPI (callback) {
    request(EXPRESS_API_URL, (err, res, body) => {
      if (err) return console.log(err);
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
    db.ExpressDoc.findAll()
    .then( (data) => {
      return callback(null, data);
    }).catch( (err) => console.err(err));
  },
  // Force an update to database
  updateDB : function (callback) {
    return fetchAPI(callback);
  },
  search : function (query, callback) {
    // const against = 'more or less';
    db.ExpressDoc.find({
      where: ['MATCH (html) AGAINST(? IN NATURAL LANGUAGE MODE)', [query]]
    }).then((results) => {
      console.log('MATCH RESULTS', results.dataValues);
      callback(null, results.dataValues)
    });

  },
  getByName : function (query, callback) {
    db.ExpressDoc.findAll().then( (data) => {
      //FIXME: NEED ERROR HANDLING FOR BAD SEARCH OR EMPTY DB
      const match = data.filter( (el) =>  query.includes(el.data_url))[0];
      return callback(null, match);
    });
  }
};
