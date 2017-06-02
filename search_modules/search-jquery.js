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

// function fetchAPI (callback) {
//     let queryURL = JQUERY_API_URL;
//     queryJquery(queryURL, (err, body) => {
//       if (err) return console.log(err);
//       //Load response html into cheerio for jquery-style manipulation
//       const $ = cheerio.load(body);
//       //Add each section within api-doc as object to methods
//       $(".entry-title").each( (i, el) => {
//         methods.push(parseJqueryAPIList($(el)))
//       });
//       Promise.resolve(getJqueryDetailsPromise)
//
//       db.JQueryDoc.bulkCreate(methods)
//         .then( () => db.JQueryDoc.findAll() )
//         .then(getJqueryDetailsPromise)
//         .then( (data) => console.log(data[1].name))
//         // .then( (data) => db.JQueryDoc.update(data) )
//         // .spread( (affectedCount, affectedRows) => console.log("affectedRows: ", affectedRows))
//         .catch( (err) => console.log('ERROR', err) );
//   });
// }
//
// function getJqueryDetail(item, callback) {
//   // const queryString = "https://api.jquery.com/add/";
//   console.log('getting details, ', url);
//   request(item.data_url, (err, res, body) => {
//       if (err) console.log("ERROR: ", err);
//       const $ = cheerio.load(body);
//
//       const detail = {
//         name : $(".entry-title").html(),
//         desc : $(".desc").html(),
//         longDesc : $("#entry-longdesc").html(),
//         signatures : $(".signature").map( (i, e) => $(e).html()).get(),
//         examples : $(".entry-example").map( (i,e) => $(e).html()).get()
//       };
//       console.log("Detail Name", detail.name);
//       db.JQueryDoc.update( {detail: detail}, { where: {id: item.id} })
//       .then( () => callback(detail) );
//   });
// }
//
//
// function getJqueryDetailsPromise(data) {
//   let count = 0;
//   let limit = 10;
//   const detailRequests = data.map( (item) => {
//     count += 1;
//     return new Promise((resolve) => {
//       if (count > limit) return resolve(item);
//       getJqueryDetail(item, resolve)
//     });
//   });
//   Promise.all(detailRequests).then( (results) => {
//     console.log('RESULTS: ', results);
//   });
// }

function updateJqueryDetails () {
  db.JQueryDoc.findAll().then(getJquery);
}

function getJquery(data) {
  // console.log('Getting Jquery, ', data[0]);
  let count = 0;
  let limit = 10;
  const detailRequests = data.map( (item) => {
    count += 1;
    return new Promise( (resolve) => {
      if (count > limit) return resolve(item);
      getJqueryDetail(item, resolve)
    });
  });

  Promise.all(detailRequests).then( (results) => {
    console.log('RESULTS: ', results);
  });
}

function getJqueryDetail(item, callback) {
  // const queryString = "https://api.jquery.com/add/";
  console.log('getting details, ', item.data_url);
  request(item.data_url, (err, res, body) => {
      if (err) console.err("ERROR: ", err);
      const $ = cheerio.load(body);

      const detail = {
        name : $(".entry-title").html(),
        desc : $(".desc").html(),
        longDesc : $("#entry-longdesc").html(),
        signatures : $(".signature").map( (i, e) => $(e).html()).get(),
        examples : $(".entry-example").map( (i,e) => $(e).html()).get()
      };
      item.detail = detail;
      console.log("Detail Name", item.detail.name);

      // db.JQueryDoc.update( item , { where: {id: item.id} })
      // .then( () => callback(detail) );
      // callback(detail);
  });
}

module.exports = {
  //Return methods previously gathered,
  getMethods : function (callback) {
    // if (methods.length) return callback(methods);
    db.JQueryDoc.findAll().then( (data) => {
      const results = data.map( (el) => {
        el.detail = JSON.parse(el.detail);
        return el;
      });
        return callback(null, results);
    });
    // .catch( (err) => console.err(err));
  },
  updateDB : function (callback) {
    return fetchAPI(callback);
  },
  getById : function (href, callback) {
  },
  getDetail : function (href, callback) {

  }
};
