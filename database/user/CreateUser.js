const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  fname:{
    type:String,
    required: true,
    trim:true
  },
  lname:{
    type:String,
    required: true,
    trim:true
  },
  age:{
    type:Number
  },
  email:{
    type:String,
    required: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw Error("Not an Valid emailid");
      }
    },
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw Error("your password is waek.");
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
})


//middleware to hash the password before it gets saved : it will run everytime .save method is called so its knw as middleware
userSchema.pre("save", async function(next){
    if (this.isModified('password')) {
  this.password= await bcrypt.hash(this.password, 8)
}
next();
})

// Fumction on each documnet to perform when called
userSchema.methods.genAuthToken= async function(){
  var token = jwt.sign({ id:this._id.toString() }, "mykey" )
  this.tokens= this.tokens.concat({token});
  await this.save();
  return token;
}

// function to perform on the whole model i.e the whole collection of userSchem
userSchema.statics.findUser= async function(email,password){
  let user = await userModel.findOne({email})
  if(!user){
    throw "Unable to loginss"
  }
  let matchPass = await  bcrypt.compare(password, user.password)
  if(!matchPass){
    throw "Unable to login s"
  }
  return user;
}

// a middleware function by default to hide data
userSchema.methods.toJSON= function(){
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

module.exports = userModel = mongoose.model("user", userSchema);
