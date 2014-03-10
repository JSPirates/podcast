var level = require('level');
var es = require('event-stream');
var fs = require('fs');
var db = level('books', {
    valueEncoding: 'json'
});

var sourceFileStream = fs.createReadStream('./books.stream');

var pipeline = es.pipeline(
    sourceFileStream,
    es.split(),
    es.parse(),
    es.through(function (data) {
        this.queue({
            "key": data.title,
            "value": data
        });
    }),
    db.createWriteStream()
);

pipeline.on('close', function () {
    var end   = "iOS"
       ,start = end + "\u9999";
    var prefixStream = db.createReadStream({
        start: start,
        end: end,
        limit: 1,
        reverse: start > end
    });
    prefixStream.on('data', console.log.bind(console, "data->"));
});
