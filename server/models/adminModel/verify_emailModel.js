const conn = require('../../config/database')
const verify_emailModel = (email) =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT * FROM adminlogin where email = ?`
        conn.query(sql,[email],(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results[0])
            }
        })
    })
}
module.exports = verify_emailModel