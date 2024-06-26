const { CustomAPIError } = require('../errors/custom-error')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next)=>{
//check if the header has jwt token authorization
console.log(req.headers)
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name:payload.name}
        next()
    } catch (error) {
        throw new CustomAPIError('You dont have an autorized token to access this')
    }

}

module.exports = auth