const searchJquery = require('../search_modules/search-jquery.js');
const updateJqueryDetails = require('../search_modules/jquery-detail-update.js');
const cheerio = require('cheerio');

const fs = require('fs');
const request = require('request');


function writeAPI (fileName, data) {
  return new Promise( (resolve, reject) => {
    fs.writeFile(__dirname + `/tmp/${fileName}.html`, data, function(err) {
      if(err) {
          console.log(err);
          reject(new Error(err));
      }
      console.log("Saved: ", fileName);
      resolve();
    });
  });
}

function requestFile (url) {
  return new Promise( (resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) console.log("ERROR: ", err);
      resolve(body);
    });
  });
}

//Give the characters between last two sets of / or jquery-api  as default
function parseFilePath(url) {
  return "jquery/" + url.split('/')[3] || 'jquery-api';
}

function scrapeJQueryAPI () {
  request("https://api.jquery.com/", (err, res, body) => {
    if (err) return console.log(err);
    writeAPI('jquery-api', body);
    const $ = cheerio.load(body);
    //Add each section within api-doc as object to methods
    $(".entry-title").each( (i, el) => {
      const url = "https:" + $(el).children('a:first-child').attr('href');
      console.log('url ', url);
      requestFile(url)
      .then( (data) => writeAPI(parseFilePath(url), data) );
    });
  });
}

function getRawFile(url){
  const filePath = parseFilePath(url);
  return new Promise( (resolve, reject) => {
    fs.readFile(__dirname + filePath, (err, data) => {
      if(err) throw error;
      resolve(data)
    });
  });
}

module.exports = {
  scrapeJquery : scrapeJQueryAPI,
  getMethodBody : getRawFile,
  updateFile : (url) => {
    const name = parseFilePath(url);
    requestFile(`https://api.jquery.com/${name}/`)
    .then( (body) => writeAPI(name, body) );
  }
}
