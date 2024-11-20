// 202239889 김백건
// express 영역
const express = require('express');
const app = express();

// EJS 템플릿 엔진 설정
app.set('views', __dirname + '/views'); // EJS View 파일이 저장된 디텍터리 설정
app.set('view engine', 'ejs');          // EJS를 view engine으로 설정

// session 영역
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);

// Mysql DB 연결 옵션 설정
const options = {
    host: 'localhost',      // 서버 호스트
    user: 'root',           // 사용자
    password: 'root',       // 비밀번호
    database: 'webdb2024'   // 연결할 DB 
};

// 옵션 설정을 기반으로 Mysql 세션 저장소 생성
const sessionStore = new MysqlStore(options);

// 세션 미들웨어 설정
app.use(
    session({
        secret: 'webdb2024',        // 세션 암호화 키
        resave: false,              // 세션 수정사항이 없을 시 저장소에 저장되지 않음
        saveUninitialized: true,    // 초기화되지 않은 세션도 저장
        store: sessionStore,        // 세션은 Mysql 세션 저장소에 저장
    })
);

// 클라이언트에서 전송할 요청 데이터를 가공해줄 모듈
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// 정적 파일 - 공용으로 사용되는 파일들은 여기서 관리 (css, image)
app.use(express.static('public'));

// 사용자 정의 Router
const rootRouter = require('./router/rootRouter');  // 루트 경로
const authRouter = require('./router/authRouter');  // 인증 관련 경로

// Router 미들웨어
app.use('/', rootRouter);
app.use('/auth', authRouter);

// Port 설정
const port = 3000;
app.listen(port, () => console.log('Server is running on port 3000'));