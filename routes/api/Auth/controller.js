const { validationResult } = require("express-validator");
const wagner = require("wagner-core")
const controllers = {};

controllers.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const user = await wagner.get("UserManager").createNewUser()


  res.send("Login page");
};

controllers.register = (req, res) => {
  res.send("Register Page");
};

controllers.forgotPassword = (req, res) => {
  res.send("Forgot password page");
};

module.exports = controllers;
