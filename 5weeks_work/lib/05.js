const db = require('./db');
var qs = require('querystring');

module.exports = {
    home: (req, res) => {
        db.query(
            'SELECT * FROM schedule05',
            (err, schedules) => {
                if (err) throw err;

                var menu = '<a href="/create">일정생성</a>';
                var detail = '<h4>상세일정</h4><p>제목을 클릭하시면 여기에 상세 일정 내용이 나옵니다.</p>';

                var context = {
                    schedules: schedules,
                    menu: menu,
                    detail: detail,
                };

                res.render('05', context, (err, html)=> res.end(html));
            }
        );
    },
    page: (req, res) => {
        var id = req.params.pageId;

        db.query(
            'SELECT * FROM schedule05',
            (err, schedules) => {
                if (err) throw err;

                db.query(
                    `SELECT * FROM schedule05 WHERE id = ${id}`,
                    (err2, schedule) => {
                        if (err2) throw err2;

                        var menu = `
                            <a href="/create">일정생성</a>&nbsp;&nbsp;
                            <a href="/update/${schedule[0].id}">일정수정</a>&nbsp;&nbsp;
                            <a href="#">일정삭제</a>`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 `89 `

                        var detail = `
                            <h4>${schedule[0].title}</h4>
                            <p>일정 시작일 : ${schedule[0].start}</p>
                            <p>일정 종료일 : ${schedule[0].end}</p>
                            <p>상제 일정: ${schedule[0].content}</p>
                            `;

                        var context = {
                            schedules: schedules,
                            menu: menu,
                            detail: detail,
                        }

                        res.render('05', context, (err, html)=> res.end(html));
                    }
                );
            }
        );
    },
    create: (req, res) => {
        db.query(
            'SELECT * FROM schedule05',
            (err, schedules) => {
                if (err) throw err;

                var menu = '<a href="/create">일정생성</a>';
                var detail = `
                    <form action="/create_process" method="post">
                        <p><input type="text" name="title" placeholder="일정제목"></input></p>
                        <p><input type="text" name="start" placeholder="20241231" length="8"></input></p>
                        <p><input type="text" name="end" placeholder="20241231" length="8"></input></p>
                        <p><textarea name="content" placeholder="내용"></textarea></p>
                        <p><input type="submit"></input></p>
                    </form>
                `;
                
                var context = {
                    schedules: schedules,
                    menu: menu,
                    detail: detail,
                };

                res.render('05', context, (err, html)=> res.end(html));
            }
        );
    },
    create_process: (req, res) => {
        var body = '';
        
        req.on(
            'data',
            (data) => {
                body += data;
            }
        );

        req.on(
            'end',
            () => {
                var post = qs.parse(body);
                
                db.query(
                    'INSERT INTO schedule05 (title, start, end, content, created) VALUES(?, ?, ?, ?, Now())',
                    [post.title, post.start, post.end, post.content], (err, result) => {
                        if (err) throw err;

                        res.writeHead(
                            302,
                            { Location: `/page/${result.insertId}`}
                        );

                        res.end();
                    }
                );
            }
        );
    },
    update: (req, res) => {
        var id = req.params.pageId;

        db.query(
            'SELECT * FROM schedule05',
            (err, schedules) => {
                if (err) throw err;

                db.query(
                    `SELECT * FROM schedule05 WHERE id = ${id}`,
                    (err2, schedule) => {
                        if (err2) throw err2;

                        var menu = `
                            <a href="/create">일정생성</a>&nbsp;&nbsp;
                            <a href="/update/${schedule[0].id}">일정수정</a>&nbsp;&nbsp;
                            <a href="#">일정삭제</a>
                        `;
                        
                        var detail = `
                            <form action="/update_process" method="post">
                                <input type="hidden" name="id" value="${schedule[0].id}">
                                <p><input type="text" name="title" placeholder="일정제목" value="${schedule[0].title}"></input></p>
                                <p><input type="text" name="start" placeholder="20241231" length="8" value="${schedule[0].start}"></input></p>
                                <p><input type="text" name="end" placeholder="20241231" length="8" value="${schedule[0].end}"></input></p>
                                <p><textarea name="content" placeholder="내용">${schedule[0].content}</textarea></p>
                                <p><input type="submit"></input></p>
                            </form>
                        `;

                        var context = {
                            schedules: schedules,
                            menu: menu,
                            detail: detail,
                        };

                        res.render('05', context, (err, html)=> res.end(html));
                    }
                );
            }
        );
    },
    update_process: (req, res) => {
        var body = '';

        req.on(
            'data',
            (data) => {
                body += data;
            }
        );

        req.on(
            'end',
            () => {
                var post = qs.parse(body);

                db.query(
                    'UPDATE schedule05 SET title = ?, start = ?, end = ?, content = ? where id = ?',
                    [post.title, post.start, post.end, post.content, post.id], (err, result) => {
                        if (err) throw err;

                        res.writeHead(
                            302,
                            { Location: `/page/${post.id}` }
                        );

                        res.end();
                    }
                );
            }
        );
    },
}