const mysql = require('mysql2');

var db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'webdb2024'
});
db.connect();

module.exports = db;