// 사용자 정의 모듈
const db = require('./db');
const util = require('./util');

module.exports = {
    home: (req, res) => {
        const { name, login, cls } = util.authIsOwner(req, res); // 요청자 정보 확인
        const menu = util.getMenuByClass(cls);   // 요청자의 cls 값을 기준으로 적합한 메뉴 가져오기

        // SQL 쿼리 정의
        const sql1 = 'select * from product;';

        db.query(
            sql1,
            (err, results) => {
                if (err) throw err; // 에러 발생 시

                // 렌더링에 필요한 데이터
                const context = {
                    who: name,              // 요청자의 이름
                    login: login,           // 요청자의 로그인 상태
                    cls: cls,               // 요청자의 클래스 상태
                    menu: menu,             // 요청자의 클래스에 맞는 메뉴 리스트

                    products: results,   // product 테이블의 결과를 전달
                    
                    body: 'test.ejs',       // 렌더링할 ejs 파일
                };

                // 렌더링 템플릿과 데이터 전달
                req.app.render('mainFrame', context, (err, html) => res.end(html));
            }
        );
    }
}