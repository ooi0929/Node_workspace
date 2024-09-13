var http = require('http');
var fs = require('fs');
var urlm = require('url');  // url 모듈 요청

var app = http.createServer(

    function(req, res) {
        // 사용자가 요청한 URL 주소를 담을 변수
        var _url = req.url;

        // url에서 querystring 문자열 추출
        var queryData = urlm.parse(_url, true).query;

        console.log(_url);
        console.log(queryData);
        console.log(__dirname);

        // 요청받은 URL 주소 분기별로 해당 로직을 실행
        if (req.url == '/') {
            _url = '/index.html';
        }

        if (req.url == '/main') {
            _url = '/main.html';
        }

        if (req.url == '/favicon.ico') {
            return res.writeHead(404);
        }

        // 상태코드
        res.writeHead(200);
        res.end(queryData.id);  // 요청 값에 따라 다르게 응답
        // res.end(fs.readFileSync(__dirname + _url));
    }
)

app.listen(3000);