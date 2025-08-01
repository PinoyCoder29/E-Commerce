const conn = require('../../config/database')
const temp_forgotPasswordModel = async (data) =>{
 return new Promise((resolve,reject) =>{
    const sql = `INSERT INTO tempstorage_forgotpassword (email,otp,expires_at) values (?,?,?)`
    const values = [
        data.email,
        data.otp,
        data.expires_at
    ]
    conn.query(sql,values,(err,results) =>{
        if(err){
            reject(err)
        }else{
            resolve(results[0])
        }
    })
 })
}

module.exports = temp_forgotPasswordModel