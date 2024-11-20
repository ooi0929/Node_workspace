// MySql 데이터베이스와 연결하기 위한 모듈

// **중요**
// MAC 환경에서의 MySQL 9.0 이상 버전부터는 mysql 모듈을 사용했을 때 오류가 발생합니다.
// mysql2 모듈을 써야 오류가 잡아집니다. 따라서 mysql2 모듈을 사용했습니다.
const mysql = require('mysql2');

// Mysql DB 연결 설정
const db = mysql.createConnection({
    host: 'localhost',          // 서버 호스트 주소
    user: 'root',               // 사용자 이름
    password: 'root',           // 사용자 비밀번호
    database: 'webdb2024',      // 사용할 데이터베이스 이름
    multipleStatements: true    // 다중 SQL 쿼리 실행 허용
});

// 데이터베이스 연결 시작
db.connect();

module.exports = db;