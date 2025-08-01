const conn = require('../../../config/database')

const customerListModel = async () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM customerlogin';
    conn.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}   

module.exports = customerListModel;