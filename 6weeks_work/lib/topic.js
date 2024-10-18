const db = require('./db');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

module.exports = {
    home: (req, res) => {
        db.query(
            'SELECT * FROM topic',
            (err, topics) => {
                if (err) throw err;

                const context = {
                    title: 'HomePage',
                    list: topics,
                    menu: '<a href="/create">create</a>',
                    body: 
                    `
                    <h2>Welcome</h2>
                    <p>Node.js Start Page</p>
                    `,
                };

                res.render('home', context, (err, html) => res.end(html));
            }
        );
    },

    page: (req, res) => {
        const id = req.params.pageId;

        db.query(
            'SELECT * FROM topic', 
            (err, topics) => {
                if (err) throw err;

                db.query(
                    `SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ${id}`,
                    (err2, topic) => {
                        if (err2) throw err2;

                        var menu = 
                        `
                        <a href="/create">create</a>&nbsp;&nbsp;
                        <a href="/update/${id}">update</a>&nbsp;&nbsp;
                        <a href="/delete/${id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>
                        `;

                        var body = 
                        `
                        <h2>${topic[0].title}</h2>
                        <p>${topic[0].descrpt}</p>
                        <p>by ${topic[0].name}</p>
                        `;

                        var context = {
                            title: topic[0].title,
                            list: topics,
                            menu: menu,
                            body: body,
                        };

                        res.render('home', context, (err, html) => res.end(html));
                    }
                );
            }
        );
    },

    create: (req, res) => {
        db.query(
            'SELECT * FROM topic',
            (err, topics) => {
                if (err) throw err;

                db.query(
                    'SELECT * FROM author',
                    (err2, authors) => {
                        var i = 0;
                        var tag = '';

                        while(i < authors.length) {
                            tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
                            i++;
                        }

                        var body =
                        `
                        <form action="/create_process" method="post">
                            <p><input type="text" name="title" placeholder="title"></input></p>
                            <p><textarea name="description" placeholder="description"></textarea></p>
                            <p>
                                <select name="author">
                                    ${tag}
                                </select>
                            </p>
                            <p><input type="submit"></input></p>
                        </form>
                        `;

                        const context = {
                            title: 'Topic Create',
                            list: topics,
                            menu: '',
                            body: 
                            `
                            <form action="/create_process" method="post">
                                <p><input type="text" name="title" placeholder="title"></p>
                                <p><textarea name="description" placeholder="description"></textarea></p>
                                <p>
                                    <select name="author">
                                        ${tag}
                                    </select>
                                </p>
                                <p><input type="submit" value="Create"></p>
                                </form>
                            `
                        };

                        res.render('home', context, (err, html) => res.end(html));
                    }
                );
            }
        );
    },

    create_process: (req, res) => {
        var body = '';
        req.on(
            'data',
            (data) => body += data
        );
        req.on(
            'end',
            () => {
                var post = qs.parse(body);
                var sanitizedTitle = sanitizeHtml(post.title);
                var sanitizedDescription = sanitizeHtml(post.description);
                var sanitizedAuthorId = sanitizeHtml(post.author);

                db.query(
                    'INSERT INTO topic (title, descrpt, created, author_id) VALUES (?, ?, NOW(), ?)',
                    [sanitizedTitle, sanitizedDescription, sanitizedAuthorId], (err, result) => {
                        if (err) throw err;

                        // res.writeHead(302, { Location: `/page/${result.insertId}`});
                        res.redirect(`/page/${result.insertId}`);
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
                    'SELECT * FROM topic WHERE id = ?',
                    [id], (err2, topic) => {
                        if (err2) throw err2;

                        db.query(
                            'SELECT * FROM author',
                            (err3, authors) => {
                                if (err3) throw err3;

                                var i = 0;
                                var tag = '';

                                while(i < authors.length) {
                                    var selected = '';

                                    if (authors[i].id === topic[0].author_id) {
                                        selected = 'selected';
                                    };

                                    tag += `<option value="${authors[i].id}" ${selected}>${authors[i].name}</option>`;
                                    i++;
                                };

                                var menu = 
                                `
                                <a href="/create">create</a>&nbsp;&nbsp;
                                <a href="/update/${topic[0].id}">update</a>
                                `;

                                var body = 
                                `
                                <form action="/update_process" method="post">
                                    <input type="hidden" name="id" value="${id}"></input>
                                    <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></input></p>
                                    <p><textarea name="description" placeholder="description">${topic[0].descrpt}</textarea></p>
                                    <p>
                                        <select name="author">
                                            ${tag}
                                        </select>
                                    </p>
                                    <p><input type="submit"></input></p>
                                </form>
                                `;

                                var context = {
                                    title: topic[0].title,
                                    list: topics,
                                    menu: menu,
                                    body: body,
                                };

                                res.render('home', context, (err, html) => res.end(html));
                            }
                        );
                    }
                );
            }
        );
    },

    update_process: (req, res) => {
        var body = '';
        req.on(
            'data',
            (data) => body += data
        );
        req.on(
            'end',
            () => {
                var post = qs.parse(body);
                var sanitizedTitle = sanitizeHtml(post.title);
                var sanitizedDescription = sanitizeHtml(post.description);
                var sanitizedAuthorId = sanitizeHtml(post.author);

                db.query(
                    'UPDATE topic SET title = ?, descrpt = ?, author_id = ? WHERE id = ?',
                    [sanitizedTitle, sanitizedDescription, sanitizedAuthorId, post.id], (err, result) => {
                        if (err) throw err;

                        res.writeHead(302, { Location: `/page/${post.id}` });
                        res.end();
                    }
                );
            }
        );
    },

    delete_process: (req, res) => {
        var id = req.params.pageId;

        db.query(
            'DELETE FROM topic WHERE id = ?',
            [id], (err, result) => {
                if (err) throw err;

                res.redirect('/');
            }
        );
    }
}