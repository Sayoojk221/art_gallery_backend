const { validationResult } = require("express-validator");
const controllers = {};

controllers.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  res.send("Login page");
};

controllers.register = (req, res) => {
  res.send("Register Page");
};

controllers.forgotPassword = (req, res) => {
  res.send("Forgot password page");
};

module.exports = controllers;
