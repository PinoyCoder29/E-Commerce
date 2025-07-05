const bcrypt = require('bcrypt')

const comparedPassword = async (plainpassword,hashpassword) =>{
    return await bcrypt.compare(plainpassword,hashpassword)
}

module.exports = comparedPassword