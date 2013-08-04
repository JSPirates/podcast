var level = require('level');

var db = level('books', {
    valueEncoding: 'json'
});

db.put('key1', { a: 1, b: 'string'}, function (err) {
    console.log('put', err);

    db.get('key1', function (err, data) {
        console.log('get1', err, data, typeof data);
    });

    db.del('key1', function (err) {
        console.log('del', err);
        db.get('key1', function (err, data) {
            console.log('get3', err, data, typeof data);
        });
    });

    db.get('key1', function (err, data) {
        console.log('get2', err, data, typeof data);
    });
});
