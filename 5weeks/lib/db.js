var mysql = require('mysql2');

var db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb24',
    }
);
db.connect();

module.exports = db;