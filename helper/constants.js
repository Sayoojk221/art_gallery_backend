const constant = {}

constant.status = {
    badRequest: 400,
    notFound: 404,
    ok:200
}

constant.messages = {
    invalidToken:"Token is not valid/expired",
    invalidLogin:"Invalid login credentials/token"
}

module.exports = constant