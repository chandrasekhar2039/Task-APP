const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  des:{
    type:String,
    trim:true,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
  },
  complete:{
    default:false,
    type:Boolean
  }
})

const taskModel = new mongoose.model("task", taskSchema);

module.exports= taskModel
