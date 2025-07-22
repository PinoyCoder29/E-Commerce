const {verifyOtpModel} = require('../../../models/adminModel/verifyOtpModel')
const jwt = require('jsonwebtoken')
const verifyOtp = async (req,res) =>{
    const {email,otp} = req.body

    if(!email || !otp){
        return res.status(400).json({
            message: 'otp are required!',
            success: false,
        })
    }
    try {
        const user = await verifyOtpModel(email,otp)
        if(!user){
            return res.status(400).json({
                message: 'invalid otp'
            })
        }
        const isExpired = new Date(user.expires_at) < new Date()
        if(isExpired){
            return res.status(400).json({
                message: 'otp expired, please try another one!',
                success: false
            })
        }
        const newToken = jwt.sign(
      {
        id:user.id,
        email:user.email,
        role: 'admin'
      },
      process.env.SECRET_KEY,
      { expiresIn: '10h' }
    );
        return res.status(200).json({
            message: 'sign In Successfully',
            success: true,
            token: newToken
            
        })
    } catch (error) {
       console.log(error)
       return res.status(400).json({
        message: 'Something went wrong please try again!',
        success: false
       })        
    }
}

module.exports = verifyOtp