// 202239889 김백건
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var todo = require('./lib/05');

app.get(
    '/',
    (req, res) => todo.home(req, res),
);

app.get(
    '/favicon.ico',
    (req, res) => {
        res.writeHead(404);
    }
);

app.listen(
    3000,
    () => console.log('Example app listening on port 3000'),
);