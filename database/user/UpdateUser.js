const mongoose = require("mongoose");

// requiring the userModel
const userModel= require("./CreateUser");

const updateUser= async (id,update)=>{
  try{
    await userModel.findByIdAndUpdate(id,update);
  }catch(e){
    throw e;
  }
}

module.exports= updateUser;
