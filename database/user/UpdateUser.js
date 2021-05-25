const mongoose = require("mongoose");

// requiring the userModel
const userModel= require("./CreateUser");

const updateUser= async (id,update)=>{
  try{
    return await userModel.findByIdAndUpdate(id,update,{new:true,runValidators:true});
  }catch(e){
    throw e;
  }
}

module.exports= updateUser;
