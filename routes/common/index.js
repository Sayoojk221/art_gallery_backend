const controllers = require("./controller")
const router = require('express').Router()

router.get("/uploads/:name", controllers.serveUploads)

module.exports = router