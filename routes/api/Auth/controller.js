const { check } = require("express-validator");
const wagner = require("wagner-core");
const jwt = require("jsonwebtoken");
const config = require("config");
const { status, messages } = require("../../../helper/constants");
const runValidation = require("../../../middleware/RunValidation");
const controllers = {};

controllers.login = [
  check("email", "Email address is required").not().isEmpty(),
  runValidation,
  async (req, res, next) => {
    try {
      const { token, email, fname, lname } = await wagner
        .get("CustomerManager")
        .initiateLogin(req.body);

      const mailPayload = {
        toEmail: email,
        subject: "Art Gallery: Login",
        templateName: "LoginToAccount",
        context: {
          code: token,
          name: `${fname} ${lname}`,
        },
      };

      await wagner.get("Mailer").sendMail(mailPayload);
      res.status(status.ok).json({
        success:
          "Please visit your registered mail account. we have shared login link.",
      });
    } catch (error) {
      next(error);
    }
  },
];

controllers.verifyLogin = async (req, res, next) => {
  try {
    const customer = await wagner
      .get("CustomerManager")
      .verifyLogin(req.params.token);

    delete customer._id;
    delete customer.isEmailVerified;
    delete customer.created_at;
    delete customer.__v;

    const token = jwt.sign(customer, config.get("jwtPrivateKey"));
    res.status(status.ok).json({
      token,
      email: customer.email,
    });
  } catch (error) {
    next(error);
  }
};

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
      const mailPayload = {
        toEmail: customer.email,
        subject: "Verify email",
        templateName: "VerifyEmail",
        context: {
          code: hashCustomer,
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
