const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("./controller");

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be atleast 5 length"),
  ],
  authController.login
);
router.post("/register", authController.register);
router.post("/forgot_password", authController.forgotPassword);
router.get("/verifyEmail/:secretToken", authController.verifyEmail);

module.exports = router;
