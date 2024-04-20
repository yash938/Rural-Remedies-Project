const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const commentSchema = require("../Api/models/comment");
const checkAuth = require('../Api/middleware/check-auth')


//Post by admin
router.post("/create", checkAuth,async (req,res)=>{
    const comment = new commentSchema({
        _id:new mongoose.Types.ObjectId,
        email:req.body.email,
        commentText:req.body.commentText,
        postId:req.body.postId
    }) 
    await comment.save()
    .then(result=>{
        res.status(200).json({
            newComment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({
            error:err
        })
    })
})

//Get all posts

router.get("/getAll",async (req,res)=>{
   await commentSchema.find()
   .select("_id email commentText")
   .then(result=>{
    res.status(200).json({
        Comments :result
    })
   })
   .catch(err=>{
    console.log(err)
    res.status(404).json({
        error:err
    })
   })
})




//delete by id
router.delete("/:postId",async (req,res)=>{
    await commentSchema.deleteOne({postId:req.params.postId})
    .select("postId email commentText")
    .then(result=>{
     res.status(200).json({
        Posts:result
     })
    })
    .catch(err=>{
     console.log(err)
     res.status(404).json({
         error:err
     })
    })
 }) 


 //update by id

 router.put("/:id", async(req,res)=>{
    await commentSchema.updateOne({_id:req.params.id},req.body)
    .then(result=>{
        res.status(200).json({
            updateOne:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({
            error:err
        })
       })
 })



 //count all category

 router.get("/get/count/:postId",(req,res)=>{
    commentSchema.find({postId:req.body.postId}).countDocuments()
    .then(result=>{
        res.status(200).json({
            count:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({
            error:err
        })
    })
 })
module.exports = router;
 