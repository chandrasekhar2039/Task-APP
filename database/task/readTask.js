const mongoose = require("mongoose");
const userModel= require("./createTask");

// to read task by id
module.exports = readTask =async (id,owner)=>{

  try{
  const task = await userModel.findOne({ _id:id, createdBy: owner })
  if(!task){
    throw "Task not found";
  }
  return task;
} catch(e){
  throw e;
}
}
