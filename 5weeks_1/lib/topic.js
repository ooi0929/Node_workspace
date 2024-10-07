const db = require('./db');
var qs = require('querystring');

module.exports = {
    home: (req, res) => {
        db.query(
            'SELECT * FROM topic',
            (err, topics) => {
                var m = '<a href="/create">create</a>';
                var b = '<h2>welcome</h2><p>Node.js Start Page</p>';

                var context = {
                    list: topics,
                    menu: m,
                    body: b,
                }

                res.render('home', context, (err, html)=> res.end(html));
            }
        );
    },
    create: (req, res) => {
        db.query(
            'SELECT * FROM topic',
            (err, topics) => {
                if (err) throw err;

                var m = '<a href="/create">create</a>';
                var b = `<form action="/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></input></p>
                        <p><textarea name="description" placeholder="description"></textarea></p>
                        <p><input type="submit"></input></p>
                    </form>`;
    
                var context = {
                    list: topics,
                    menu: m,
                    body: b,
                };
    
                res.render('home', context, (err, html)=> res.end(html));
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
                    'INSERT INTO topic (title, descrpt, created) VALUES(?, ?, Now())',
                    [post.title, post.description], (err, result) => {
                        if (err) throw err;

                        res.writeHead(
                            302,
                            {
                                Location: `/page/${result.insertId}`
                            }
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
            'SELECT * FROM topic',
            (err, topics) => {
                if (err) throw err;

                db.query(
                    `SELECT * FROM topic WHERE id = ${id}`,
                    (err2, topic) => {
                        if (err2) throw err2;

                        var m = 
                            `
                            <a href="/create">create</a>&nbsp;&nbsp;
                            <a href="/update/${topic[0].id}">update</a>&nbsp;&nbsp;
                            <a href="#">delete</a>
                            `;
                        var b = 
                            `
                            <form action="/update_process" method="post">
                                <input type="hidden" name="id" value="${topic[0].id}">
                                <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                                <p><textarea type="textarea" name="description" placeholder="description">${topic[0].descrpt}</textarea></p>
                                <p><input type="submit"></input></p>
                            </form> 
                            `;

                        var context = {
                            list: topics,
                            menu: m,
                            body: b,
                        };

                        res.render('home', context, (err, html)=> res.end(html));
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
                    'UPDATE topic SET title = ?, descrpt = ? where id = ?',
                    [post.title, post.description, post.id], (err, result) => {
                        if (err) throw err;

                        res.writeHead(
                            302,
                            {Location: `/page/${post.id}`}
                        );
                        res.end();
                    }
                )
            }
        );
    },
    page: (req, res) => {
        var id = req.params.pageId;

        db.query(
            'SELECT * FROM topic',
            (err, topics) => {
                if (err) {
                    throw err;
                }

                db.query(
                    `SELECT * FROM topic WHERE id = ${id}`,
                    (err2, topic) => {
                        if (err2) {
                            throw err2;
                        }

                        var m = `<a href="/create">create</a>&nbsp;&nbsp;<a href="/update/${topic[0].id}">update</a>&nbsp;&nbsp;<a href="#">delete</a>`;
                        var b = `<h2>${topic[0].title}</h2><p>${topic[0].descrpt}</p>`;

                        var context = {
                            list: topics,
                            menu: m,
                            body: b,
                        };

                        req.app.render('home', context, (err, html) => res.end(html));
                    }
                );
            }
        );
    }
}