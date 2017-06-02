const cheerio = require('cheerio');
const request = require('request');
const db = require('../models');

module.exports = updateJqueryDetails;

function updateJqueryDetails () {
  db.JQueryDoc.findAll().then(getJquery);
}

function getJquery(data) {
  // console.log('Getting Jquery, ', data[0]);

  const detailRequests = data.map( (item) => {
    return new Promise( (resolve) => {
      getJqueryDetail(item, resolve)
    });
  });

  Promise.all(detailRequests).then( (results) => {
    results.forEach( (item) => console.log(item.name + " - " + item.detail.name) );
  }).catch( (err) => console.log("ERROR: ", err) );
}

function getJqueryDetail(item, callback) {
  // const queryString = "https://api.jquery.com/add/";
  console.log('getting details, ', item.data_url);
  request("https:" + item.data_url, (err, res, body) => {
      if (err) console.log("ERROR: ", err);
      const $ = cheerio.load(body);

      const detail = {
        name : $(".entry-title").html(),
        desc : $(".desc").html(),
        longDesc : $("#entry-longdesc").html(),
        signatures : $(".signature").map( (i, e) => $(e).html()).get(),
        examples : $(".entry-example").map( (i,e) => $(e).html()).get()
      };
      const detailString = JSON.stringify(detail);
      // console.log("Detail Name", JSON.parse(item.detail).name);
      console.log("Item id", item.id);

      db.JQueryDoc.update({ detail: detailString }, { fields: ['detail'], where: {id: item.id} })
      .then( () => callback(detail) );
      // callback(detail);
  });
}
