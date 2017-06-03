const http = require("http");
const zlib = require("zlib");

function queryStack (url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];
    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString());

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            // console.log('buffer: ', buffer.join(""));
            callback(null, JSON.parse(buffer.join("")));

        }).on("error", function(e) {
            callback(e);
        });
    }).on('error', function(e) {
        callback(e);
    });
}

 module.exports = {
  search : function (query, language, callback) {
    // Create stackoverflow API search string
    // NOTE: changed to advanced search to allow free text search strings
    console.log("Querying stack");
    let url = 'http://api.stackexchange.com/2.2/search/advanced?';
    url += 'order=desc&site=stackoverflow&sort=relevance';
    url +="&tagged=" + language + "&filter=withbody";
    url += '&q=' + encodeURIComponent(query);
    return queryStack(url, callback);
  },
  getAnswers : function ( id, callback ) {
    const url = 'http://api.stackexchange.com/2.2/questions/' + id + '/answers/?pagesize=10&order=desc&sort=votes&site=stackoverflow&filter=withbody';
    return queryStack(url, callback);
  }
};
