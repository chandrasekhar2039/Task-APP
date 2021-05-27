const mongoose = require("mongoose");
const taskModel = require("./createTask")

const deleteone =async (id)=>{
  try{
    await taskModel.findByIdAndDelete(id);
  }catch (e){
    throw e;
  }
}

const task= async (id)=>{
  try{
  await taskModel.deleteMany({createdBy:id});
  }catch(e){
    throw e
  }
}

module.exports= {task,deleteone};
