// 입력값의 HTML 태그 제거를 위한 모듈
const sanitizeHtml = require('sanitize-html');

// 사용자 정의 모듈
const db = require('./db');                            
const util = require('./util');

module.exports = {
    login: (req, res) => {
        const { name, login, cls } = util.authIsOwner(req, res);
        const menu = util.getMenuByClass(cls);

        const context = {
            who: name,
            login: login,
            cls: cls,
            menu: menu,

            body: 'login.ejs',
        };

        req.app.render('mainFrame', context, (err, html) => res.end(html));
    },

    // 로그인 처리 메서드
    loginProcess: (req, res) => {
        var post = req.body;
        var sntzedLoginid = sanitizeHtml(post.loginid);
        var sntzedPassword = sanitizeHtml(post.password);

        // SQL 쿼리
        const sql1 = 'select count(*) as num from person where loginid=? and password=?';
        const sql2 = 'select name, class, loginid, grade from person where loginid=? and password=?';

        // 쿼리 실행문
        db.query(
            sql1,
            [sntzedLoginid, sntzedPassword], (err1, results) => {
                if (err1) throw err1;

                // 조회 결과가 있으면 로그인 성공 처리
                if (results[0].num === 1) {
                    db.query(
                        sql2,
                        [sntzedLoginid, sntzedPassword], (err2, result) => {
                            if (err2) throw err2;

                            req.session.is_logined = true;
                            req.session.loginid = result[0].loginid;
                            req.session.name = result[0].name;
                            req.session.cls = result[0].class;
                            req.session.grade = result[0].grade;

                            res.redirect('/');
                        }
                    );
                } else {
                    // 조회 결과가 없으면 게스트로 처리.
                    req.session.is_logined = false;
                    req.session.name = 'Guest';
                    req.session.cls = 'NON';

                    res.redirect('/');
                }
            }
        );
    },

    // 로그아웃 처리 메서드
    logout: (req, res) => {
        // 로그아웃 시 세션을 제거 후 홈페이지로 이동
        req.session.destroy(
            (err) => {
                if (err) throw err;

                res.redirect('/');
            }
        );
    },

    // 회원가입 페이지 렌더링 메서드
    register: (req, res) => {
        const { name, login, cls } = util.authIsOwner(req, res);
        const menu = util.getMenuByClass(cls);

        // SQL 쿼리
        const sql1 = 'select * from person';

        // 쿼리 실행문
        db.query(
            sql1,
            (err, results) => {
                if (err) throw err;

                if (!req.session.is_logined) {
                    const context = {
                        who: name,
                        login: login,
                        cls: cls,
                        menu: menu,
    
                        body: 'personCU.ejs',
                    };
    
                    req.app.render('mainFrame', context, (err, html) => res.end(html));
                } else {

                    res.redirect('/');
                }
            }
        );
    },

    // 회원가입 처리 메서드
    registerProcess: (req, res) => {
        const post = req.body;

        const sntzedLoginid = sanitizeHtml(post.loginid);
        const sntzedPassword = sanitizeHtml(post.password);
        const sntzedName = sanitizeHtml(post.name);
        const sntzedAddress = sanitizeHtml(post.address);
        const sntzedTel = sanitizeHtml(post.tel);
        const sntzedBirth = sanitizeHtml(post.birth);
        

        // SQL 쿼리
        sql1 = 'insert into person (loginid, name, password, address, tel, birth, class, grade) values (?, ?, ?, ?, ?, ?, ?, ?)';

        // 쿼리 실행문
        db.query(
            sql1,
            [
                sntzedLoginid,
                sntzedName,
                sntzedPassword,
                sntzedAddress,
                sntzedTel,
                sntzedBirth,
                'CST', // 사용자의 기본 클래스는 고객
                'S',   // 사용자의 기본 등급은 실버
            ], (err, results) => {
                if (err) throw err;

                res.redirect('/');
            }
        );
    },
};
