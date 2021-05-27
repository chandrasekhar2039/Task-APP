const express = require("express")

module.exports = router = express.Router();

// importing all the task database
const taskModel = require("../../database/task/createTask")
const readTask = require("../../database/task/readTask")
const updateTask = require("../../database/task/updateTask")
const deleteTask = require("../../database/task/deleteTask")


// importing the auth
const auth = require("../../Middleware/auth.js")

// create tasks
router.post("/task",auth, async (req,res)=>{
  const task = new taskModel ({
    ... req.body,
    createdBy: req.user._id
  })
  try{
    await task.save()
    res.send(task).status(201);
  }catch (e){
res.send(e).status(500);
  }
})

// read all the tasks by a user
router.get("/task",auth, async (req,res)=>{
  try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// read a particulat task by a user
router.get("/task/:id",auth, async (req,res)=>{
  try {
        const task = await readTask(req.params.id,req.user._id)
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
// update task
router.patch("/task/:id",auth,async (req,res)=>{
  const updates = Object.keys(req.body)
  const allowedUpdates= ["des","complete"]
  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
  if(!isValidOperation){
    res.send({Error:"Invalid updates"}).status(400);
  }
  try{
    const update = await updateTask(req.body,req.params.id);
    res.send(update);
  }catch (e){
    res.send(e).status(500);
  }

})
//delete tasks
router.delete("/task/:id",auth,async (req,res)=>{
  try{
    await deleteTask.deleteone(req.params.id);
    res.send("Sucess the task is deleted !");
  }catch (e){
    res.send(e).status(500);
  }
})
