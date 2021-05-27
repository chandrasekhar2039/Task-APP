const express= require("express");

// rewuiring the database userModel
const UserCreate= require("../../database/user/CreateUser.js")
const {readAll, readById}= require("../../database/user/ReadUser.js")
const updateUser = require("../../database/user/updateUser.js")
const deleteUser = require("../../database/user/deleteUser.js")
const deleteTask = require("../../database/task/deleteTask.js")

// middle ware auth requring
const auth = require("../../Middleware/auth.js")

// Exporting the whole router
module.exports = router = express.Router();


// to create a new user
router.post("/signup",async (req,res)=>{

  const newUser = new UserCreate(req.body);
  try{
    await newUser.save();
    var token = await newUser.genAuthToken();
    res.status(201).send({newUser,token});
  }catch(e){
    res.status(400).send(e);
  }
})

// to login
router.post("/login",async (req,res)=>{
try{
  let userData = await UserCreate.findUser(req.body.email,req.body.password)
  let token = await userData.genAuthToken();
  res.send({userData,token}).status(200);
}catch (e){
  res.send(e).status(500);
}
})

// logout from a single device
router.post("/logout",auth, (req,res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token;
    })
    req.user.save();
    res.send("Sucess !")
  }catch (e){
    res.status(500).send(" faill to logout")
  }
})
//logout from all device
router.post("/logoutall",auth, (req,res)=>{
  try{
    req.user.tokens = []
    req.user.save();
    res.send("Sucess !")
  }catch (e){
    res.status(500).send(" faill to logout")
  }
})

// to get user data
router.get("/profile",auth,async (req,res)=>{
  res.send(req.user);
})

// to update user data by Id
router.patch("/update",auth,async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['fname','lname','age','email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

  try{
    var data = await updateUser(req.user._id,req.body);
    res.send(data)
  } catch(e){
    let err = {
      Error:e
    }
    res.status(400).send(err);
  }
})

// to delete an user data by Id
router.delete("/delete",auth,async (req,res)=>{
  try{
    await deleteTask.task(req.user._id);
     await deleteUser(req.user._id);
    res.send("sucessfully deleted");
  } catch(e){
    let err = {
      Error:e
    }
    res.status(400).send(err);
  }
})
