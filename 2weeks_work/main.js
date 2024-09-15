// 학번 - 202239889
// 이름 - 김백건

const express = require('express'); // express 모듈
const app = express();  // express framework -> 간편하게 웹 서버 생성

// 홈 디렉토리 '/'
app.get(
    '/',
    (req, res) => {

        var template = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>책과 음악이 있는 곳<h1>
                <hr>
                <ol>
                    <li>
                        <a href="/BOOK">책</a>
                    </li>
                    <li>
                        <a href="/MUSIC">음악</a>
                    </li>
                </ol>
            </body>
        </html>
        `;
        
        // 브라우저에 응답할 내용 전송
        res.send(template);
    }
);

// BOOK
app.get(
    '/BOOK',
    (req, res) => {
        var template = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
            <body>
                <h1>책과 음악이 있는 곳</h1>
                <hr>
                <h3>
                    1. <a href="/BOOK">책</a>
                <h3>
                <ul>
                    <li>총균쇠</li>
                    <li>내면소통</li>
                </ul>
                <h3> 
                    2. <a href="/MUSIC">음악</a>
                </h3>
            </body>
            </html>
        `;

        // 브라우저에 응답할 내용 전송
        res.send(template);
    }
);

// MUSIC
app.get(
    '/MUSIC',
    (req, res) => {
        var template = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>책과 음악이 있는 곳<h1>
                <hr>
                <h3>
                    1. <a href="/BOOK">책</a>
                </h3>
                <h3>
                    2. <a href="/MUSIC">음악</a>
                </h3>
                <ul>
                    <li>바빌론 강가에서</li>
                    <li>I'll be missing you</li>
                </ul>
            </body>
        </html>
        `;
        
        // 브라우저에 응답할 내용 전송
        res.send(template);
    }
);

app.get(
    '/favicon.ico', 
    (req, res) => res.writeHead(404)
);

app.listen(
    3000,   // 포트번호
    () => console.log('Example app listening on port 3000') // 요청이 들어올 시 콘솔에 출력
);