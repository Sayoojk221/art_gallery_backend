const { validationResult, check } = require("express-validator");
const wagner = require("wagner-core");
const {status} = require("../../../helper/constants");
const runValidation = require("../../../middleware/RunValidation");
const controllers = {};

controllers.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const user = await wagner.get("UserManager").createNewUser();

  res.send("Login page");
};

controllers.register = [
  check("fname", "First name is required").not().isEmpty(),
  check("lname", "Last name is required").not().isEmpty(),
  check("email", "Email address is required").not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
  runValidation,
  async (req,res,next) => {
    try {
      const customer = await wagner.get("CustomerManager").createNewUser(req.body);
      
      delete customer._id
      delete customer.isEmailVerified
      delete customer.socialMedia

      res.status(status.ok).json(customer)
    } catch (error) {
      next(error)
    }
  },
];

controllers.forgotPassword = (req, res) => {
  res.send("Forgot password page");
};

module.exports = controllers;
