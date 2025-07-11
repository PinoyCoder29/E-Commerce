const conn = require('../../config/database')
const Update_NewPasswordModel = (email,password) =>{
    return new Promise((resolve,reject) =>{
        const sql = `UPDATE customerlogin SET password = ? where email = ?`
        conn.query(sql,[email,password],(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = Update_NewPasswordModel