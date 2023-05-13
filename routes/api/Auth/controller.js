const { check } = require("express-validator");
const wagner = require("wagner-core");
const { status,messages } = require("../../../helper/constants");
const runValidation = require("../../../middleware/RunValidation");
const config = require("config");
const controllers = {};

controllers.login = [
  check("email", "Email address is required").not().isEmpty(),
  runValidation,
  async (req, res) => {
    res.send("Login page");
  },
];

controllers.register = [
  check("fname", "First name is required").not().isEmpty(),
  check("lname", "Last name is required").not().isEmpty(),
  check("email", "Email address is required").not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
  runValidation,
  async (req, res, next) => {
    try {
      const customer = await wagner
        .get("CustomerManager")
        .createNewUser(req.body);

      const hashCustomer = wagner.get("Crypto").encrypt(customer.email);

      const fromEmail = config.get("mail.auth.user");
      const toEmail = customer.email;

      const mailPayload = {
        fromEmail,
        toEmail,
        subject: "Verify email",
        templateName: "VerifyEmail",
        context: {
          code: hashCustomer,
          baseUrl: req.protocol + "://" + req.headers.host,
        },
      };

      await wagner.get("Mailer").sendMail(mailPayload);

      delete customer._id;
      delete customer.isEmailVerified;
      delete customer.socialMedia;

      res.status(status.ok).json(customer);
    } catch (error) {
      next(error);
    }
  },
];

controllers.forgotPassword = (req, res) => {
  res.send("Forgot password page");
};

controllers.verifyEmail = async (req, res, next) => {
  try {
    const validateKey = wagner.get("Crypto").decrypt(req.params.secretToken);
    if (!validateKey)
      return res
        .status(status.badRequest)
        .json({ error: messages.invalidToken });
    const customer = await wagner
      .get("CustomerManager")
      .verifyCustomer(validateKey);
    res.status(status.ok).json(customer);
  } catch (error) {
    next(error);
  }
};

module.exports = controllers;
