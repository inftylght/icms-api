const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config.db);

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
