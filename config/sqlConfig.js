const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: '34.101.87.24',
    user: 'root',
    password: 'code01',
    database: 'speaktoo',
});

module.exports = db;