var mysql = require('mysql');


const pool = mysql.createPool({
  connectionLimit : 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})


module.exports = pool;