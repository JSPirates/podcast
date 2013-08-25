var express = require('express');
var LeveldbStore = require('connect-leveldb')(express);
var nunjucks = require('nunjucks');
var http = require('http');
var path = require('path');
var app = express();
var user = require('./user');
var nun = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

nun.express(app);

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());

if ('development' == app.get('env')) {
	app.use(express.logger('dev'));
}

app.use(express.bodyParser());
app.use(express.cookieParser('anotheronebitesthedust'));
app.use(express.session({
	store: new LeveldbStore({
		dbLocation: "./db/sessions",
		ttl: 60*60*2
	}),
	secret: 'foobarbaz'
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
	res.render(!!req.user ? "user.html" : "guest.html", { myuser: req.user });
});

app.get('/register', function (req, res) {
	res.render("registration.html", { regMode: true });
});

app.post('/auth/register', function (req, res) {
});

app.post('/auth/login', function (req, res) {
});

app.get('/auth/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
