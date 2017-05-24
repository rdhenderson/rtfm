var Fuse = require('fuse.js');

var options = {
  caseSensitive: true,
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: ["name"]
};

module.exports = function (list, query, keys) {
  //allow user to set custom keys
  const fuse = new Fuse(list, options); // "list" is the item array
  let results = fuse.search(query);
  console.log(results);
  return results;
}



//
//
// function fuzzySearchExpress(list) {
//   getMethods( null,  ( err, results ) => {
//     if ( err ) {
//       console.log( err )
//       throw err;
//     }
//     // console.log( 'results', results );
//     const methods = results.map( (elem) => elem.name );
//     console.log('methods', methods);
//     const fuzzyResults = fuzzy.filter(query, methods);
//     // var matches = fuzzyResults.map(function(el) { return el.string; });
//     console.log('matches', fuzzyResults);
//   });
// }

// fuzzySearchExpress('express.static');
