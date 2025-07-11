const express = require('express')
const router = express.Router()

const verify_email = require('../controlllers/authAdmin.js/verifyEmail')


router.post('/verify_email',verify_email)

module.exports = router