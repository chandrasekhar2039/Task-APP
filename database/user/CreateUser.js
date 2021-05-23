const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema({
  fname:{
    type:String,
    required: true
  },
  lname:{
    type:String,
    required: true
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
    }
  }
})

module.exports = userModel = mongoose.model("user", userSchema);
