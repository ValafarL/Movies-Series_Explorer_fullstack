const User = require('../models/User')
const {createCustomError, CustomAPIError} = require('../errors/custom-error')

const register = async (req,res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new CustomAPIError('Please fill all the blank spaces', 400);
    }
    const emailAlreadyUsed = await User.findOne({ email });
    if (emailAlreadyUsed) {
      throw new CustomAPIError('Email already used', 409);
    }
    const user = await User.create({...req.body})
    const token = user.createJWT()
    console.log(token)
    res.status(201).json({user:{name: user.name}, token})
}
const login = async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomAPIError('Please provide email and password', 401)
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomAPIError('Email or Password is incorrect', 401)
    }

    //verify if the password match using a function created
    //in User Schema that uses bcrypt
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new CustomAPIError('Email or Password is incorrect', 401)
    }
    //if password is matching we want to create an jwt token 
    //for the user can access datas that require login, and jwt 
    //token gives secures methods to correlate information with the current user

    //jwt token is created with a method in UserSchema
    //the Server create an schema using the user credentials and a secret key that just 
    //the server knows for security, then it retuns the JWT to the user 
    const token = user.createJWT()
    console.log("LOGGED IN")
    console.log(req.body)
    res.status(200).json({user:{name: user.name}, token})
}

module.exports = {
    register,
    login
}