// Express로 동적 페이지 만들기

const express = require('express'); // express 모듈 
// Application 객체 생성 후 변수에 할당
const app = express();
var urlm = require('url');  // url 모듈
const fs = require('fs');   // fs 모듈

app.get(
    '/',
    (req, res) => {
        var _url = req.url;
        title = 'welcome';
        var queryData = urlm.parse(_url, true).query;
        console.log(queryData.id);
        var title = queryData.id;

        var template = fs.readFileSync(__dirname + '/template.html');

        res.send(template);
    }
)

app.get(
    '/favicon.ico',
    (req, res) => res.writeHead(404)
);

app.listen(
    3000,
    () => console.log('Example app listening on port 3000')
);