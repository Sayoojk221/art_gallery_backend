const express = require('express')
const router = express.Router()
const artController = require('./controller')

router.get('/home',artController.home)

module.exports = router