// require(): 외부 모듈을 객체화해서 가져오는 함수
var http = require('http'); // http 웹서버 기능의 모듈
var fs = require('fs'); // 파일 처리 모듈 (file system)

// 외부 ip
const host = '192.168.0.5';

// 서버 생성을 하기 위해 필수적인 메서드
// createServer(): 웹서버 객체 생성
// listen(): 웹 서버 객체의 요청을 대기

// req: 객체로서 웹 서버에 클라이언트의 요청이 들어오면 요청 관련 정보가 req에 저장
// res: 객체로서 클라이언트에 응답하기 위한 메서드 및 정보 저장

// 서버 생성
var app = http.createServer( 

    // 여기에 클라이언트의 요청을 받아서 URL을 분류하고
    // URL에 따른 controller에 해당하는 로직 작성

    // request를 듣고 해야할 작업들을 정의
    // 요청이 들어오면 콜백 함수 실행
    function(req, res) {
        // 요청된 url 정보 획득
        var url = req.url; 

        // 각 요청에 따른 작업들을 코딩
        if(req.url == '/') {    // Url
            url = '/05_index.html'; // Controller
        }

        // 리다이렉트 메시지 전송
        if(req.url == '/favicon.ico') {
            return res.writeHead(404);
        }

        // 디렉토리 네임을 찾아서 읽기 (동기)
        // writeHead(statusCode, Object): 응답헤더작성
        // end([data]): 서버가 클라이언트에 응답하는 메서드 (응답 본문 작성)
        // __는 JS에서 기본적으로 정의된 변수 앞에 연결
        // 현재 파일이 위치한 폴더의 절대 경로를 저장
        res.writeHead(200);
        console.log(__dirname + url);   // 콘설에 출력
        // res.end(fs.readFileSync(__dirname + url));  // Template
        res.end('egoing : ' + url); // 화면에 출력
    }
);

// request를 듣기 위한 메서드
// port: 3000
app.listen(3000);