const jwt = require("jsonwebtoken");
const config = require("config");
const { status, messages } = require("../helper/constants");

module.exports = (req, res, next) => {
  let authHeader, bearer, customer;
  authHeader = req.headers["authorization"];
  if (authHeader) {
    bearer = authHeader.split(" ")[1];
    if (bearer) {
      customer = jwt.verify(bearer, config.get("jwtPrivateKey"));
      if (customer) {
        req.customer = customer;
        next();
      }
    }
  }

  if (!authHeader || !bearer || !customer) {
    res.status(status.unauthorized).json({ error: messages.unauthorized });
  }
};
