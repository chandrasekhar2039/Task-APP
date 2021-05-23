const express= require("express");

// rewuiring the database userModel
const UserCreate= require("../../database/user/CreateUser.js")
const {readAll, readById}= require("../../database/user/ReadUser.js")
const updateUser = require("../../database/user/updateUser.js")
const deleteUser = require("../../database/user/deleteUser.js")

// Exporting the whole router
module.exports = router = express.Router();


// to create a new user
router.post("/user",async (req,res)=>{

  const newUser = new UserCreate(req.body);
  try{
    await newUser.save()
    res.status(201).send(newUser);
  }catch(e){
    res.status(400).send(e);
  }
})

// to get all user data
router.get("/user",async (req,res)=>{
  try{
    let data = await readAll();
    res.send(data);
  }catch(e){
    let err = {
      Error:e
    }
    res.send(err).status(400);
  }
})

// to get user data by Id
router.get("/user/:id",async (req,res)=>{
  try{
    var data = await readById(req.params.id)
    res.send(data)
  } catch(e){
    let err = {
      Error:e
    }
    res.status(400).send(err);
  }
})

// to update user data by Id
router.patch("/user/:id",async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['fname','lname','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

  try{
    await updateUser(req.params.id,req.body);
    var data = await readById(req.params.id)
    res.send(data)
  } catch(e){
    let err = {
      Error:e
    }
    res.status(400).send(err);
  }
})

// to delete an user data by Id
router.delete("/user/:id",async (req,res)=>{
  try{
     await deleteUser(req.params.id);
     let count = {
       count:await userModel.countDocuments({})
     }
    res.send(count);
  } catch(e){
    let err = {
      Error:e
    }
    res.status(400).send(err);
  }
})
