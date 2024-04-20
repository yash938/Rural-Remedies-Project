const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const PostSchema = require("../Api/models/post")
const checkAdmin = require("../Api/middleware/check-admin")

//Post by admin
router.post("/create",checkAdmin,async (req,res)=>{
    const post = new PostSchema({
        _id:new mongoose.Types.ObjectId,
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        imageUrl:req.body.imageUrl
    }) 
    await post.save()
    .then(result=>{
        res.status(200).json({
            newPost:result
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

router.get("/",async (req,res)=>{
   await PostSchema.find()
   .select("_id title description category imageUrl")
   .then(result=>{
    res.status(200).json({
        Post:result
    })
   })
   .catch(err=>{
    console.log(err)
    res.status(404).json({
        error:err
    })
   })
})


//Post by Id
router.get("/:id",async (req,res)=>{
   await PostSchema.find({_id:req.params.id})
   .select("_id title description category imageUrl")
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


//post by Category
router.get("/category/:category",async (req,res)=>{
   await PostSchema.find({category:req.params.category})
   .select("_id title description category imageUrl")
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


//delete by id
router.delete("/:id",checkAdmin, async(req,res)=>{
    await PostSchema.deleteOne({_id:req.params.id})
    .select("_id title description imageUrl")
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

 router.put("/:id", checkAdmin,async(req,res)=>{
    await PostSchema.updateOne({_id:req.params.id},req.body)
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


 //count all post
 router.get("/get/count",(req,res)=>{
    PostSchema.find().countDocuments()
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
 