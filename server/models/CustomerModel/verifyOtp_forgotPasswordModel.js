const conn = require('../../config/database')
const verifyOtp_forgotPasswordModel = (email,otp) =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT * from tempstorage_forgotpassword where email = ? and otp = ? `
        conn.query(sql,[email,otp],(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results[0])
            }
        })
    })
}

module.exports = verifyOtp_forgotPasswordModel