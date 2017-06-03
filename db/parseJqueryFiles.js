const searchJquery = require('../search_modules/search-jquery.js');
const updateJqueryDetails = require('../search_modules/jquery-detail-update.js');
const cheerio = require('cheerio');
const request = require('request');

const fs = require('fs');
const db = require('../models');

const EXPRESS_BASE_URL = 'https://expressjs.com/en/';
const EXPRESS_API_URL = EXPRESS_BASE_URL + '4x/api.html';

//Export will run database update
module.exports = updateDatabase();

// getMethodFile('add').then(parseMethodDetail);

// PARSE JQUERY API LIST TO CREATE METHOD ARRAY
function genMethodList(){
  let methodsList = [];
  const body = fs.readFileSync(__dirname + '/tmp/jquery-api.html');
  const $ = cheerio.load(body);
  //Add each section within api-doc as object to methods
  $(".entry-title").each( (i, el) => {
    const data_url = $(el).children('a:first-child').attr('href').split('/')[3];
    methodsList.push(data_url);
  });
  return methodsList;
}

//Get stored jquery file and pass text to next function
function getMethodFile(fileName){
  return new Promise( (resolve, reject) => {
    fs.readFile(__dirname + `/tmp/jquery/${fileName}.html`, (err, data) => {
          if (err) reject(err);
          if (data.length === 0) console.log('File is empty - ', fileName);
          resolve(data);
        });
    });
}

function parseMethodDetail(body) {
    // Load method html file as body for jquery-style parsing
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(body);
    const name = $(".entry-title").html() || "ERROR";
    // const data_url = item;
    const desc = $(".desc").html();
    const detail = $("#entry-longdesc").html();
    // const signatures =  $(".signature").map( (i, e) => $(e).html()).get();
    let examples = [];
    $(".entry-examples").find('td.code').each( (i, el) => {
      examples.push( $(el).html() );
    });

    const newMethod = {
      name : name,
      description : desc,
      detail : detail,
      examples : examples
    };
    // Send new method on to next function in chain
    resolve(newMethod);
  });
}

// Takes cheerio/jquery object and return an express method object
function parseExpressSection($el) {
  return ;
}

function fetchExpressAPI (callback) {
    request(EXPRESS_API_URL, (err, res, body) => {
      if (err) return console.log(err);
      //Load response html into cheerio for jquery-style manipulation
      let expressMethods = [];
      const $ = cheerio.load(body);
      //Add each section within api-doc as object to methods
      $('table').attr('class', 'table');
      $('thead').attr('class', 'thead-inverse');

      $("section", '#api-doc').each( (i, el) => {
        expressMethods.push({
            name : $(el).children('h3').first().text(),
            shortName: $(el).children('h3').first().text().split('(')[0],
            detail : $(el).html(),
            link : $(el).children('h3').first().text().split('(')[0].split('.').join("")
        });
      });

      // Add methods to database, retrieve and send to callback
      db.ExpressDoc.bulkCreate(expressMethods)
        .then(() => db.ExpressDoc.findAll())
        .then((data) => callback(null, data));
  });
}
function updateDatabase() {
  db.sequelize.sync({ force: true }).then( () => {

    // Update express database
    fetchExpressAPI( () => console.log('Updated Express Table'));

    let methodsList = genMethodList();
    methodsList.forEach( (data_url) => {
      getMethodFile(data_url)
        .then( parseMethodDetail )
        .then( (method) => {
          method.data_url = data_url; //Need to add data_url from api-list
          console.log('Adding name: ', data_url);
          return db.JQueryDoc.create(method)
      }).then( () => {
        if (methodsList.indexOf(data_url) === methodsList.length-1)
          console.log(`Updated JQuery Table in Database`)
      }).catch( (err) => console.log('ERROR: ', err));
    });
  });
}

// updateDatabase();
