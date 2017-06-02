const cheerio = require('cheerio');
const fs = require('fs');
const fileAPI = require('./file-api-jquery.js');

function parseGeneral(){
  const data = fs.readFileSync(__dirname + '/tmp/jquery-api.html');
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(data);
    let methods = [];
    $(".entry-title").each( (i, el) => {
      methods.push({
        name : $(el).children('a:first-child').text() || "error",
        data_url : $(el).children('a:first-child').attr('href'),
        html : $(el).parent().next().html()
      });
    });
    console.log('First Name: ', methods[0].name);
    resolve(methods);
  });
}

function parseDetail(data, item, callback) {
  const $ = cheerio.load(data);

  const detail = {
    name : $(".entry-title").html(),
    desc : $(".desc").html(),
    longDesc : $("#entry-longdesc").html(),
    signatures : $(".signature").map( (i, e) => $(e).html()).get(),
    examples : $(".entry-example").map( (i,e) => $(e).html()).get()
  };
  // const detailString = JSON.stringify(detail);
  item.detail = detail;
  callback(item);
}
function updateMissingFiles (items) {
  const missingItems = items.map( (item) => fileAPI.updateFile(item.data_url) );
  Promise.all(missingItems).then( (results) => console.log("All Files Downloaded"));
}

function findMissingFiles () {
  parseGeneral().then( (methods) => {
    const methodsParsed = methods.map( (item) => {
      return new Promise( (resolve) => {
        const name = item.data_url.split('/')[3];
        fs.readFile(__dirname + `/tmp/jquery/${name}.html`, (err, data) => {
          if (err) return console.log(err);
          parseDetail(data, item, resolve);
        });
      });
    });

    Promise.all(methodsParsed)
    .then( (results) => {
      return new Promise( (resolve) => {
        results.forEach( (item) => console.log(item.name + " - " + item.detail.name) );
        const missingItems = results.filter( (item) => !item.detail.name );
        resolve(missingItems);
      });
    })
    .then(updateMissingFiles)
    .then( (results) => console.log('results', results[0]) )
      // console.log(`Missing ${items.length} items. First one is ${JSON.stringify(items[0])}`) )
    .catch( (err) => console.log("ERROR: ", err) );
  });
}

findMissingFiles();
