const express = require('express')
const router = express.Router()
const verifyEmail = require('../controlllers/auth/verifyEmail')
const verifyOtp = require('../controlllers/auth/verifyOtp')
const customerSIgnIn = require('../controlllers/auth/customerSIgnIn')

router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.post('/customerSignIn',customerSIgnIn)

module.exports = router;