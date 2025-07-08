const customerModel = require('../../models/customerModel')
const generateOtp = require('../../utils/generateOtp')
const {temp_Storage,checkExistingOtp} = require('../../models/customer_temp_storage')
const {sendEmail} = require('../../utils/sendOtpEmail')
const verifyEmail = async (req,res) =>{

    const {firstName,lastName,birthdate,gender,email,password} = req.body

    if(!firstName || !lastName || !birthdate || !gender || !email || !password ){
        return res.status(400).json({  
            message: 'all fields are required!',
            success: false,
        })
    }

    try {
        const existEmail = await customerModel.verifyEmailExists(email);
        if(existEmail){
            return res.status(400).json({
                message: 'email already registered, plsss try another one!',
                success: false,
            })
        }
        
        const existingOtp = await checkExistingOtp(email)
        if(existingOtp){
            return res.status(400).json({
                message: 'otp already send, please wait a few minutes before trying again',
                success: false
            })
        }
        
                    const birthDateObj = new Date(birthdate)
            const today = new Date()

            // Compute age
            let age = today.getFullYear() - birthDateObj.getFullYear()
            const monthDiff = today.getMonth() - birthDateObj.getMonth()

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--
            }

            // Check if user is 14 or below
            if (age <= 14) {
            return res.status(400).json({
                message: 'You must be at least 15 years old to register.',
                success: false
            })
}
        

        const otp = generateOtp()
        const expires_at = new Date(Date.now() + 5 * 60 * 1000)
 
        
        await temp_Storage({
            firstName,
            lastName,
            birthdate,
            gender,
            email,
            password,
            otp,
            expires_at
        })
        
       await sendEmail(email,otp);

        return res.status(200).json({
            message: 'otp has been sent to your email',
            success: true,
            otp: otp
        })
       
    } catch (error) {
        console.log('verifyEmail error:',error)
        return res.status(400).json({
            message: 'Something went wrong please try again',
            success: false
        })
    }
}

module.exports = verifyEmail