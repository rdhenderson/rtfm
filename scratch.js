const cheerio = require('cheerio');
const request = require('request');
const db = require('./models');

function updateJqueryDetails (db) {
  db.jqueryDocs.findAll().then(getJquery);
}

function getJquery(data) {
  // console.log('Getting Jquery, ', data[0]);
  const detailRequests = data.map( (item) => {
    return new Promise((resolve) => {
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





// getJquery(data); //.then( (methods) => console.log('Resolved ', methods)).catch( (err) => console.log("Error", err));
// let data = [
//   "https://api.jquery.com/add",
//   "https://api.jquery.com/map",
//   "https://api.jquery.com/each",
// ];

// getJqueryDetail();

//FIXME: Figure out how to remove gutter and other elements from
// captured string.

//Remove code gutter formatting
// $(".syntaxhighlighter > pre").map( (el) => {
//   $(el).parents(".javascript syntaxhighlighter").html(el);
// }
//
// $(".syntaxhighlighter").each( (i, el) => {
//
//   $(this).before(codeBlocks[i]);
//   $(this).remove();
// });
