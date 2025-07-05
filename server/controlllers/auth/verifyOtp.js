const customerModel = require('../../models/customerModel')


const verifyOtp = async (req,res) =>{
    const {email,otp} = req.body

    if(!email || !otp){
        return res.status(400).json({
            message: 'all fields are required!',
            success: false,
        })
    }
    
    try {
        const user = await customerModel.getByEmailAndOtp(email,otp);
        
        if(!user){
            return res.status(400).json({
                message: 'invalid Otp',
                succes: false,
            })
        }
        
       const isExpired = new Date(user.expires_at) < new Date()
        if(isExpired){
            return res.status(400).json({
                message: 'expired otp please try another one',
                succes: false
            })
        }
        
        await customerModel.saveVerifiedUser(user);
        return res.status(200).json({
            message:'otp verify successfully',
            success: true
        })
    } catch (error) {
        
    }
}
module.exports = 
    verifyOtp
