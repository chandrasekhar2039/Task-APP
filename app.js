// seting up Express
const express = require("express")
const app= express()

// Requring Database and connecting to it
require("./database/connect.js")


// Parsing everything into JSON
app.use(express.json());

// Routers
const userRouter = require("./routes/users/user")
app.use(userRouter);



app.get("/",(req,res)=>{
  res.send("Hello server!!")
});




// Setting up port
const port= 3000;

//seting up the server to listen
app.listen(port,(req,res)=>{
  console.log("Server is up and running at port:"+port);
});
