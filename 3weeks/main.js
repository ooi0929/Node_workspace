const express = require('express'); // express모듈을 객체로 불러옴.
const app = express();  // Application 객체를 생성 후 변수 대입.

// ejs 엔진을 사용하기 위한 코드
app.set('views', __dirname + '/views');  // 해당 경로에 있는 view 폴더 속 정해진 값을 찾아서 설정
app.set('view engine', 'ejs'); // ejs를 default 엔진으로 설정

// ejs파일을 HTML 파일로 바꾸는 과정 - 렌더링
app.get(
    '/',
    (req, res)=> {
        var context = {
            title: 'welcome-1',
            name: '김백건',
        };
        res.render('home', context, (err, html)=> res.end(html));
    }
);

app.get(
    '/:id',
    (req, res)=> {
        // 여기에 있는 내용을
        var id = req.params.id;

        // ejs에 있는 파라미터에 똑같은 개수, 이름을 맞춰서 넘겨줘야 한다. 
        // 에러 발생 해결 - 가짜값이라도 넘겨줘야 함.
        var context = {
            title: id,
            name: '김백건', 
        };

        // 경로에 지정하지 않도록 주의! - 보안상 문제.
        res.render('home', context, (err, html)=> res.end(html));
    }
);

app.get(
    '/favicon.ico',
    (req, res)=> {
        res.writeHead(404);
    }
);

app.listen(
    3000,
    ()=> console.log('Example app listening on port 3000'),
);