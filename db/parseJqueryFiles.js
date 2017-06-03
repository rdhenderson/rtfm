const searchJquery = require('../search_modules/search-jquery.js');
const updateJqueryDetails = require('../search_modules/jquery-detail-update.js');
const cheerio = require('cheerio');

const fs = require('fs');
const db = require('../models');

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
          resolve(data);
        });
    });
}

function parseMethodDetail(body) {
    // Load method html file as body for jquery-style parsing
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(body);
    const name = $(".entry-title").html();
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

function updateDatabase() {
  db.sequelize.sync({ force: true }).then( () => {

    // Update express database
    require('../search_modules/search-express.js').updateDB( () => console.log('Updated Express Table'));

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
