const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const {UnauthorizedError} = require('../utils/errors');

// function that exctracts the JWT from the request header (splits prefix and actual token)
const jwtFrom = ({headers}) => {
    if(headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if(scheme.trim() === 'Bearer') {
            return token
        }
    }

    return undefined
}
// function that attaches the user to res.locals
const extractUserFromJwt = (req,res,next) => {
    try {
        const token = jwtFrom(req);
        if(token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }

        return next()
    } catch(error) {
        return next(error)
    }
}

// function that verifies a authed user exists
const requireAuthenticatedUser = (req, res, next) => {
    try{
        const {user} = res.locals
        if(!user?.email) {
            throw new UnauthorizedError()
        }
        return next()
    }catch(error){
        return next(error)
    }
}

module.exports = {
    requireAuthenticatedUser,
    extractUserFromJwt
}