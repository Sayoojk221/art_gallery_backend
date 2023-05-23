const express = require('express')
const router = express.Router()
const artController = require('./controller')

router.post('/',artController.addArt)
router.get("/home", artController.artHome)
router.get("/details",artController.singleArt)
router.post('/topic',artController.createTopic)
router.get('/topic',artController.topics)
router.get("/search",artController.searchArts)
router.get("/byTopic",artController.artsByTopic)

module.exports = router