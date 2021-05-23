const mongoose = require("mongoose");

// requiring the userModel
const userModel= require("./CreateUser");

const deleteuser = async (id)=>{
  try{
    await userModel.findByIdAndDelete(id);
  } catch(e){
    throw e;
  }
}

module.exports = deleteuser;
