const { status } = require("../helper/constants");

module.exports = (error, req, res, next) => {
  if (error) {
    console.log(error);
    return res.status(status.badRequest).json({ error: error.message });
  }

  next();
};
