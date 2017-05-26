var http = require("http"),
    zlib = require("zlib");

module.exports = (query, callback) => {
  //Create stackoverflow API search string
  let url = 'http://api.stackexchange.com/2.2/search?';
  url += 'order=desc&site=stackoverflow&pagesize=5&sort=relevance&tagged=javascript';
  url += '&intitle=' + encodeURIComponent(query);

    // buffer to store the streamed decompression
    var buffer = [];
    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            // console.log('buffer: ', buffer.join(""));
            callback(null, JSON.parse(buffer.join("")));

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}
