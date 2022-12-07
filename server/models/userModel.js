const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "Passsword  must be at least 6 characters"],
    // maxLength: [20, "Passsword  must not be more than 20 characters"]
  },
  photo: {
    type: String,
    required: [true, "Please add a picture"],
    default : "https://i.ibb.co/4pDNDk1/avatar.png"
  },
  phone: {
    type: String,
    default : "+91"
  },
  bio: {
    type: String,
    maxLength: [250, "Bio  must not be more than 250 Character"],
    default : "bio"
  }
},{
  timestamps: true,
});

// Encrypt the password before save
userSchema.pre("save", async function(next){
if(!this.isModified('password')) {
return next();
}

// Encrypt the password
const salt =10
const bcryptHash = await bcrypt.genSalt(salt)
const hashedPassword = await bcrypt.hash(this.password,bcryptHash)
this.password = hashedPassword
})
const User = mongoose.model("User", userSchema);

module.exports = User;
