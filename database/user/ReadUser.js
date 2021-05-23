const mongoose = require("mongoose");

// requiring the userModel
const userModel= require("./CreateUser");

const readAll= async ()=>{
  try{
    var data = await userModel.find({})
    if(!data){
      throw "No Data found";
    }
    return data;
  } catch(e){
    throw e;
  }

}


const readById = async (id)=>{
  try{
    var data = await userModel.findById(id)
    if(!data){
      throw "No Data found for that user";
    }
    return data;
  }catch(e){
    throw e;
  }
}

module.exports={readAll, readById};
