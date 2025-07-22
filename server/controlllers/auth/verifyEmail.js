const verify_emailModel = require('../../../models/adminModel/verify_emailModel')
const generateotp = require('../../../utils/generateOtp')
const otp_temp_storageModel = require('../../../models/adminModel/otp_temp_storageModel')
const {sendEmail} = require('../../../utils/sendOtpEmail')
const verifyEmail = async (req,res) =>{
    const {email,password} = req.body
    
    if(!email || !password){
        return res.status(400).json({
            message: 'all fields are required!',
            success: false,
        })
    }
    try {
        const user = await verify_emailModel(email)
        if(!user){
            return res.status(400).json({
                messsage: 'Email  not found,please try another email',
                success: false
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                message: 'Incorrect email or password!',
                success: false
            })
        }
        const otp = generateotp()
        const expires_at = new Date(Date.now() + 5 * 60 * 1000)
        
        await otp_temp_storageModel(email,otp,expires_at)
        
        await sendEmail(email,otp)
        return res.status(200).json({
            message:'otp has been send to your email',
            success: true,
            otp: otp
        })
    } catch (error) {
        console.log(error)
      return res.status(400).json({
        message: 'something went wrong,please try again later!.'
      })        
    }
}
module.exports = verifyEmail