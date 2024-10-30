// 202239889 김백건
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const MysqlStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb2024',
}
var sessionStore = new MysqlStore(options);

const session = require('express-session');
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    })
);

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