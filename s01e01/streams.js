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
    var prefix = "iOS";
    var prefixStream = db.createReadStream({
        start: prefix + '\u9999',
        end: prefix,
        limit: 1,
        reverse: true
    });
    prefixStream.on('data', function (data) {
        console.log('data', data);
    });
});
