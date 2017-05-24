'use strict'

const osmosis = require('osmosis');
const request = require('request');
const cheerio = require('cheerio');

// Escapes CSS characters and adds leading # to identify ID
function escapeID( myid ) {
  return "#" + myid.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

module.exports = function(id, callback) {
  request('https://expressjs.com/en/4x/api.html',  (err, res, body) => {
    if (err) return callback(err, null)
    const $ = cheerio.load(body);
    let methods = [];

    if (id) {
      var result = $(escapeID(id), '#api-doc')
      methods.push({ name : result.text(), section : result.parent('section').html() });
    } else {
      $("section", '#api-doc').each( (i, elem) =>
        methods.push({
            name : $(elem).children('h3').first().text(),
            section : $(elem).html()
        })
      );
    }
    return callback(err, methods);
  });
}

// //Sends query to MDN and returns responding articles
// //Returns an array of objects  {title: x, description: x, url: x}
// // module.exports =
// function getExpressMethods(callback)  {
//   osmosis
//       .log(console.log)
//       .error(console.log)
//       .debug(console.log)
//       .get('https://expressjs.com/en/4x/api.html')
//       .find('#menu li')
//       .set({
//           'url': 'a@href',
//           'text' : 'a'
//         })
//       .data((data) => (callback) ? callback(data) : data);
// }
//
// function getExpressDoc(reference, callback) {
//   osmosis
//       .log(console.log)
//       .error(console.log)
//       .debug(console.log)
//       .get('https://expressjs.com/en/4x/api.html')
//       .find( '#req.params' )
//       .set({ 'text' : 'h3' })
//       .data( (data) => (callback) ? callback(data) : data)
// }
//
// //const expressMethods = getExpressMethods();
// // const appMountPath = getExpressDoc('#req.params');
// //console.log(appMountPath);
