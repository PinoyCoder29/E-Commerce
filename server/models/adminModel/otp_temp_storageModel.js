const conn = require('../../config/database')
const otp_temp_storageModel = (email,otp,expires_at) =>{
   return new Promise((resolve,reject) =>{
        const sql = `INSERT INTO tempstorage_forgotpassword (email,otp,expires_at) values (?,?,?)`
        conn.query(sql,[email,otp,expires_at],(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = otp_temp_storageModel