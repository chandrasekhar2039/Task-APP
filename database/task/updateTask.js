const mongoose = require("mongoose");
const taskModel = require("./createTask")

module.exports = updateTask = async (updates,id)=>{
  try{
    return await taskModel.findByIdAndUpdate(id,updates,{new:true,runValidators:true});
  }catch(e){
    throw e;
  }
}
