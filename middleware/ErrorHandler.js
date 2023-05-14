const { status } = require("../helper/constants");

module.exports = (error, req, res, next) => {
  if (error) {
    return res.status(status.badRequest).json({ error: error.message });
  }

  console.log('====================================');
  console.log(error);
  console.log('====================================');

  next();
};
