const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-shop',
  password: 'aa270494'
})


module.exports = pool.promise();