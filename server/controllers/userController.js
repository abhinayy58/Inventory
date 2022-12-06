const asyncHanlder = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const userRegister = asyncHanlder(async(req,res) => {
const {name,email,password} = req.body
// validation 
if(!name || !email || !password){
    res.status(400)
    throw new Error("Please fill in all required fields")
}
if(password.length < 6 ){
    res.status(400)
    throw new Error("Password must be at least 6 characters")
}

// Check if the user already exist
const userExists = await User.findOne({email})

if(userExists){
    res.status(400)
    throw new Error("Email already has been registered")
}
// Encrypt the password
const salt =10
const bcryptHash = await bcrypt.genSalt(salt)
const hashedPassword = await bcrypt.hash(password,bcryptHash)


// Create a new user

const user = await User.create({
    name,
    email,
    password:hashedPassword
})
if(user){
    res.status(201).json({
        id:user._id,
        name:user.name,
        email:user.email,
        bio:user.bio,
        photo:user.photo,
        phone:user.phone
    })
} else {
    res.status(400)
    throw new Error('Invalid user Data')
}

})

module.exports = {
    userRegister
} 