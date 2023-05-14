const express = require("express");
const router = express.Router();

//middle wares
const validateJWT = require("../../middleware/validateJWT");

const authRouter = require("./Auth");
const artRouter = require("./Arts");

router.use("/", authRouter);
router.use("/art", validateJWT, artRouter);

module.exports = router;
