const express = require('express')
const router = express.Router()
const verifyEmail = require('../controlllers/customer/verifyEmail')
const verifyOtp = require('../controlllers/customer/verifyOtp')
const customerSIgnIn = require('../controlllers/customer/customerSIgnIn')
const verifyEmail_ForgotPassword = require('../controlllers/customer/verifyEmail_ForgotPassword')
const verifyOtp_ForgotPassword = require('../controlllers/customer/verifyOtp_ForgotPassword')
const verify_NewPassword = require('../controlllers/customer/verfiy_NewPassword')
router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.post('/customerSignIn',customerSIgnIn)
router.post('/verifyEmailPassword',verifyEmail_ForgotPassword)
router.post('/verifyOtp_forgotPassword',verifyOtp_ForgotPassword)
router.post('/verify_NewPassword',verify_NewPassword)
module.exports = router;