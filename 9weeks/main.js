// 202239889 김백건
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var authorRouter = require('./router/authorRouter');
var rootRouter = require('./router/rootRouter');

app.use(
    '/',
    rootRouter
);

app.use(
    '/author',
    authorRouter
);

app.listen(
    3000,
    () => console.log('Example app listening on port 3000')
);