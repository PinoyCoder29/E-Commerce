const verifyOtp_forgotPasswordModel = require('../../models/CustomerModel/verifyOtp_forgotPasswordModel')
 const verifyOtp_ForgotPassword = async (req,res) =>{
    const {email,otp} = req.body

    if(!email || !otp){
        return res.status(400).json({
            message: 'otp are required!',
            success: false
        })
    }
    try {
        const user = await verifyOtp_forgotPasswordModel(email,otp)

        if(!user){
            return res.status(400).json({
                message: 'Invalid Otp!'
            })
        }
      const isExpiredOtp = new Date(user.expires_at) < new Date()
      if(isExpiredOtp){
        return res.status(400).json({
            message: 'otp expired, please try another one!'
        })
      }
    
      return res.status(200).json({
        message: 'verify otp Sucessfully'
      })
    } catch (error) {
        
    }
}

module.exports = verifyOtp_ForgotPassword