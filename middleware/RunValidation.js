const { validationResult } = require("express-validator");
const { status } = require("../helper/constants");

module.exports = (req, res, next) => {
  const validate = validationResult(req);

  if (!validate.isEmpty()) {
    return res
      .status(status.badRequest)
      .json({ error: validate.array()[0].msg });
  }

  next();
};
