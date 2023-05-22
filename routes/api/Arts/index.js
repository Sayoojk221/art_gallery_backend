const express = require('express')
const router = express.Router()
const artController = require('./controller')

router.post('/',artController.addArt)
router.get("/listArts/:page", artController.listOfArts)
router.get("/details",artController.singleArt)
router.post('/topic',artController.createTopic)
router.get('/topic',artController.topics)

module.exports = router