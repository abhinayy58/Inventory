const asyncHanlder = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require("bcryptjs")

const genrateToken = require("../config/GenerateToken")



const userRegister = asyncHanlder(async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // Check if the user already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already has been registered");
  }
  // Create a new user

  const user = await User.create({
    name,
    email,
    password,
  });
  // Genrate Token
  const token = genrateToken(user._id);
  // Send HTTP-only cookies
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Days
    sameSite: "none",
    secure: true,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      photo: user.photo,
      phone: user.phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});


const userLogin = asyncHanlder(async(req,res)=>{
const {email, password} = req.body;
//validate req
if(!email || !password) {
    res.status(400)
    throw new Error("Please Add Email and password");
}
const user = await User.findOne({email})

if(!user) {
    res.status(400)
    throw new Error("User Not Found Please SignUp");
}

//user is exist
const passwordIsTrue = await bcrypt.compare(password, user.password);
const token = genrateToken(user._id)
res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Days
    sameSite: "none",
    secure: true,
  });

if(user && passwordIsTrue){
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        photo: user.photo,
        phone: user.phone
    })
} else {
    res.status(400)
    throw new Error("Invalid email or password");
}
})

const logOut = asyncHanlder(async(req,res) => {
    // delete cookies
    res.cookie("token", '', {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // 1 Days
        sameSite: "none",
        secure: true,
      });

      return res.status(200).json({message: "Successfully logged out"})
})

module.exports = {
    userRegister,
    userLogin,
    logOut
} 