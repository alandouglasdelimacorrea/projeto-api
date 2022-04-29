const mysql = require('mysql2')

var pool = mysql.createPool({
    host     : "",
    user     : "",
    password : "",
    database : "",
    port     : 3036
});

exports.pool = pool;    