const { check } = require("express-validator");
const wagner = require("wagner-core");
const { status } = require("../../../helper/constants");
const runValidation = require("../../../middleware/RunValidation");
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


      await wagner.get("Mailer").sendMail({
        fromEmail: "ksayooj22@gmail.com",
        toEmail: "sayoojk221@gmail.com",
        subject: "Verify email",
        templateName: "VerifyEmail",
        context: {
          code: hashCustomer,
          baseUrl: req.protocol + "://" + req.headers.host,
        },
      });

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

controllers.verifyEmail = (req, res) => {
  res.send("Verify email page: "+req.params.secretToken);
};

module.exports = controllers;
