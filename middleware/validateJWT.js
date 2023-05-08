const authorize = (req,res,next) => {

    console.log('Middleware logged')
    next()
}

module.exports = authorize