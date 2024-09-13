// Express 설치 및 Hello World 실행하기

const express = require('express'); // express 모듈

// express() 함수에 의해 Application 객체를 변수에 할당
const app = express();

app.get(
    '/', 
    (req, res) => res.send('Hello World') 
);

app.get(
    '/author',
    (req, res) => res.send('/author')
);

app.listen(
    3000,
    () => console.log('Example app listening on port 3000')
);