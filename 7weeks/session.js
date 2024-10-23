var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'webdb2024'
};
var sessionStore = new MySqlStore(options);
var app = express();

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

app.get(
    '/',
    function(req, res, next) {
        console.log(req.session);

        if (req.session.num === undefined) {
            req.session.num = 1;
        } else {
            req.session.num += 1;
        }

        res.send(`Hello Session : ${req.session.num}`);
    }
);

app.listen(
    3000,
    () => console.log('3000!')
);