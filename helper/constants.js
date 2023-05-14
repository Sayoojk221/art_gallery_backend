const constant = {}

constant.status = {
    badRequest: 400,
    notFound: 404,
    ok:200,
    unauthorized:401
}

constant.messages = {
    invalidToken:"Token is not valid/expired.",
    unauthorized:"Authorization failed."
}

module.exports = constant