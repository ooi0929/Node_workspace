// express와 views 영역
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 세션 관리 영역
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);

var option = {
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'webdb2024'
};

var sessionStore = new MySqlStore(option);
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    })
);

// bodyParser 모듈로 Post 데이터 코드 간략화
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// 이미지 불러오기
// app.use(express.static('public'));
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// 사용자 정의 모듈
var rootRouter = require('./router/rootRouter');
var authRouter = require('./router/authRouter');
// var codeRouter = require('./router/codeRouter');
// var personRouter = require('./router/personRouter');
// var productRouter = require('./router/productRouter');

// Route 경로
app.use('/', rootRouter); 
app.use('/auth', authRouter);
// app.use('/code', codeRouter);
// app.use('/person', personRouter);
// app.use('/productRouter', productRouter);

// 에러 발생
app.get(
    '/favicon.ico',
    (req, res) => res.writeHead(404)
);

// 요청 리스닝
app.listen(
    3000,
    () => console.log('Example app listening on port 3000')
);