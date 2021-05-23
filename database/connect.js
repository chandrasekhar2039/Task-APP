const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Task-Manager-API',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=>console.log("Database is connected !!")).catch((err)=>console.log("Error in connecting database !! "+ err));
