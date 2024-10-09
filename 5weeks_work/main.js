// 202239889 김백건
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var schedule = require('./lib/05');

app.get(
    '/',
    (req, res) => schedule.home(req, res),
);

app.get(
    '/page/:pageId',
    (req, res) => schedule.page(req, res),
);

app.get(
    '/create',
    (req, res) => schedule.create(req, res),
);

app.post(
    '/create_process',
    (req, res) => schedule.create_process(req, res),
);

app.get(
    '/update/:pageId',
    (req, res) => schedule.update(req, res),
);

app.post(
    '/update_process',
    (req, res) => schedule.update_process(req, res),
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