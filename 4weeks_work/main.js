// 학번 - 202239889
// 이름 - 김백건

const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var mysql = require('mysql');
var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb2024',
    },
);

app.get(
    '/',
    (req, res) => {
        var context = {
            number: 202239889,
            name: '김백건',
            header: 'webdb2024에 생성된 테이블 목록',
        };

        res.render('home', context, (err, html)=>res.end(html));
    }
);

app.get(
    '/TOPIC',
    (req, res) => {

        connection.query(
            'SELECT * FROM topic',
            (err, results) => {

                var lists = '<ol type="1">';

                var i = 0;
                while (i < results.length) {
                    lists += `<li><a href="#">${results[i].title}</a></li>`;
                    i ++;
                }

                lists += '</ol>';

                var context = {
                    title: 'Welcome',
                    list: lists,
                };

                 res.render('topic', context, (err, html)=>res.end(html));
            }
        );
    }
);

app.get(
    '/AUTHOR',
    (req, res) => {
        var context = {};

        res.render('author', context, (err, html)=>res.end(html));
    }
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