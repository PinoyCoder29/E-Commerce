const express = require('express')
const router = express.Router()

const verify_email = require('../controlllers/admin/auth/verifyEmail')
const verify_otp = require('../controlllers/admin/auth/verifyOtp')
const dashboard = require('../controlllers/admin/dashboard/dashboard')
const authorize = require('../middleware/authorizeRole')
const authenticate = require('../middleware/authMiddleware')

router.post('/verify_email',verify_email)
router.post('/verify_otp',verify_otp)
router.get('/dashboard',authenticate,authorize(['dashboard']),dashboard)
module.exports = router