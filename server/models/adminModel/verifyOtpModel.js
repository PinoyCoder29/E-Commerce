const conn = require('../../config/database')

const verifyOtpModel = (email, otp) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM tempstorage_forgotpassword WHERE email = ? AND otp = ?`
    conn.query(sql, [email, otp], (err, results) => {
      if (err) {
        return reject(err)
      }

      if (results.length > 0) {
        resolve(results[0]) // return first matched row
      } else {
        resolve(null) // no match found
      }
    })
  })
}

module.exports = {
  verifyOtpModel
}
