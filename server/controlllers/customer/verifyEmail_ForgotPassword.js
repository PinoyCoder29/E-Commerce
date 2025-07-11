const  temp_forgotPasswordModel = require('../../models/CustomerModel/temp_forgotPasswordModel')
const CustomerModel = require('../../models/customerModel')
const generateOtp = require('../../utils/generateOtp')
const { sendEmail } = require('../../utils/sendOtpEmail')
const verifyEmailPassword = async (req,res) =>{
    const {email} = req.body

    if(!email){
        return res.status(400).json({
            message: 'email are required!',
            success: false
        })
   }
   try {
    const existingEmail = await CustomerModel.verifyForgotPasswordEmail(email)

    if(!existingEmail){
        return res.status(400).json({
            message: 'email not found, please try another email!'
        })
    }
    
    const otp = generateOtp()
    const expires_at = new Date(Date.now() + 5 * 60 * 1000)
    await temp_forgotPasswordModel({
     email,
        otp,
        expires_at
    }
    )
    
    await sendEmail(email,otp)

    return res.status(200).json({
        message: 'otp has been send to your email!'
    })
   } catch (error) {
     console.error('Error in verifyEmailPassword:', error);
    return res.status(400).json({
      message: 'Something went wrong. Please try again.',
      success: false,
    });
   }
}

module.exports = verifyEmailPassword