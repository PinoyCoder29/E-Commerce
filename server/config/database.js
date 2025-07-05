const mysql2 = require('mysql2')
require('dotenv').config()
const dbconfig = mysql2.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

dbconfig.connect((err) =>{
    if(err){
        console.error('database not connected!',err)
    }else{
        console.log('database connected!')
    }
})

module.exports = dbconfig