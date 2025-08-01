const express = require('express')

const router = express.Router()
const mainController = require('../controlllers/mainController/mainController')

router.get('/popularProducts',mainController)


module.exports = router