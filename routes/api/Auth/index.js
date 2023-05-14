const express = require("express");
const router = express.Router();

const authController = require("./controller");

router.post("/", authController.login);
router.get("/login/:token", authController.verifyLogin);
router.post("/register", authController.register);
router.post("/forgot_password", authController.forgotPassword);
router.get("/verifyEmail/:secretToken", authController.verifyEmail);

module.exports = router;
