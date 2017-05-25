// Information on MDN document parameters here:
// https://developer.mozilla.org/en-US/docs/MDN/Contribute/Tools/Document_parameters
  const request = require('request');

  module.exports = (url, callback) => {
    request(url,  (err, res, body) => {
      if (err) throw err;
      console.log(JSON.parse(body));
      return (callback) ? callback(JSON.parse(body)) : JSON.parse(body);
    });
  }
