const mysql = require('mysql2')

var pool = mysql.createPool({
    connectionLimit: 1000,
    host     : "localhost",
    user     : "alan",
    password : "porcoEspinh@0",
    database : "projeto",
    port     : 3306
});

exports.execute = (query, params=[]) => {
    return new Promise ((resolve, reject) => {
        pool.query(query, params, (error, result) => {
            if(error){
                reject(error);
            } else{
                resolve(result);
            }
        })
    })
}

exports.pool = pool;    