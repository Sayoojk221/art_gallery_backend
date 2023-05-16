const constant = {};

constant.status = {
  badRequest: 400,
  notFound: 404,
  ok: 200,
  unauthorized: 401,
  internalError: 500,
};

constant.messages = {
  invalidToken: "Token is not valid/expired.",
  unauthorized: "Authorization failed.",
  internalError: "Something went wrong internal server!",
};

module.exports = constant;
