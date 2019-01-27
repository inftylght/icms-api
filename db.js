const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'MGBxYbHVaLYE3znyfHbTBUKSEgjuJu',
  database: 'icms',
})

module.exports = {
  query: function(sql, value=[]) {
    return new Promise((resolve, reject) => {
      pool.query(sql, value, function(error, results, fields) {
        if (error) {
          console.error(error);
          reject(error)
        } else {
          resolve([results, fields])
        }
      })
    });
  }
};
