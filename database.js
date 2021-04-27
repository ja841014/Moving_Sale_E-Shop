const mysql = require('mysql2');

module.exports.connection = mysql.createConnection({
    // '192.168.12.128', 
    // '192.168.2.129'
    host: '192.168.2.129',
    user: 'root',
    password: '1',
    database: 'project',
    multipleStatements: true
});