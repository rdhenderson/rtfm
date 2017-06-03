'use strict';
const db = require('../models');
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
        data_url : $el.children('a:first-child').attr('href'),
        html : $el.parent().next().html(),
    };
}

function fetchAPI (callback) {
    let queryURL = JQUERY_API_URL;
    queryJquery(queryURL, (err, body) => {
      if (err) return console.log(err);
      //Load response html into cheerio for jquery-style manipulation
      const $ = cheerio.load(body);
      //Add each section within api-doc as object to methods
      $(".entry-title").each( (i, el) => {
        methods.push(parseJqueryAPIList($(el)))
      });

      db.JQueryDoc.bulkCreate(methods)
        .then( () => require('./jquery-detail-update.js')() )
        .catch( (err) => console.log('ERROR', err) );
  });
}

module.exports = {
  //Return methods previously gathered,
  getMethods : function (callback) {
    // if (methods.length) return callback(methods);
    db.JQueryDoc.findAll().then( (data) => {
        return callback(null, data);
    });
    // .catch( (err) => console.err(err));
  },
  updateDB : function (callback) {
    return fetchAPI(callback);
  },
  search : function (query, callback) {
    db.JQueryDoc.find({
      where: ['MATCH (detail) AGAINST(? IN NATURAL LANGUAGE MODE)', [query]]
    }).then((results) => {
      console.log('MATCH RESULTS', results.dataValues);
      callback(null, results.dataValues);
    });
  },
  getByName : function (query, callback) {
    db.JQueryDoc.findAll().then( (data) => {
      //FIXME: NEED ERROR HANDLING FOR BAD SEARCH OR EMPTY DB, ONLY RETURNING ONE MATCH
      const match = data.filter( (el) =>  query.includes(el.data_url) );
      return callback(null, match[0]);
    });
  },
  getById : function (id, callback) {
    db.JQueryDoc.findOne({
      where: {id: id}
    }).then( (data) => {
      return callback(null, data);
    });
  },

  getDetail : function (href, callback) {

  }
};
