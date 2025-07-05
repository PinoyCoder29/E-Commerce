const conn = require('../config/database');
const hashPassword = require('../utils/hashedPassword');

const temp_Storage = async (data) => {
  const { firstName, lastName, birthdate, gender, email, password, otp, expires_at } = data;

  const hashedPassword = await hashPassword(password);

  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO customer_temp_storage 
      (firstName, lastName, birthdate, gender, email, password, otp, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(
      sql,
      [firstName, lastName, birthdate, gender, email, hashedPassword, otp, expires_at],
      (err, results) => {
        if (err) {
          console.error('temp_Storage error:', err);
          return reject(new Error('Failed to store temporary customer data.'));
        }
        resolve(results);
      }
    );
  });
};

const checkExistingOtp = (email) =>{
  return new Promise((resolve,reject) =>{
z
    const sql = `SELECT * FROM customer_temp_storage 
    WHERE email = ? AND expires_at > NOW() LIMIT 1`

    conn.query(sql,[email],(err,results) =>{
    if(err){
      return reject(err)
    }else{
      return resolve(results[0])
    }
  })
  })
  
}
module.exports = {
  temp_Storage,checkExistingOtp

};
