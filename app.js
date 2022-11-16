var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const indexRouter = require('./routers/index');
const crawlRouter = require('./routers/crawl');

var app = express();
const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/releases', express.static(path.join(__dirname, 'public')));
app.use('/comparecommits/:owner/:repo/:base/:head', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/', crawlRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});