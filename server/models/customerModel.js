// models/customerModel.js
const conn = require('../config/database');

const verifyEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT email FROM customerlogin WHERE email = ?';
    
    conn.query(sql, [email], (err, results) => {
      if (err) {
        console.error('verifyEmailExists error:', err);
        return reject(err);
      }

      resolve(results.length > 0);
    });
  });
};

const getByEmailAndOtp = (email,otp) =>{
  return new Promise((resolve,reject) =>{
    const sql = `SELECT * from customer_temp_storage WHERE email = ? AND otp = ?`
    
    conn.query(sql,[email,otp],(err,results) =>{
      if(err){
        return reject(err);
      }else{
        resolve(results[0])
      }
    })
  })
}

const saveVerifiedUser = (user) =>{
  return new Promise((resolve,reject) =>{
    try {
      const sql = `INSERT INTO customerlogin (firstName,lastName,birthdate,gender,email,password) VALUES (?,?,?,?,?,?)`
      const values = [
        user.firstName,
        user.lastName,
        user.birthdate,
        user.gender,
        user.email,
        user.password
      ]
      conn.query(sql,values,(err,results) =>{
        if(err){
         return reject(err);
        }else{
          return resolve(results)
        }
      })
    } catch (error) {
     return reject(error)
    }
  })
}

const getUserByEmail = (email) =>{
  return new Promise((resolve,reject) =>{

    try {
      const sql = `SELECT * FROM customerlogin WHERE email = ?`
    conn.query(sql,[email],(err,results) =>{
      if(err){
        return reject(err)
      }else{
       return resolve(results[0])
      }
    })
    } catch (error) {
      return reject(error)
    }
  })
}
module.exports = {
  verifyEmailExists,
  getByEmailAndOtp,
  saveVerifiedUser,
  getUserByEmail
};
