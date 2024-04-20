const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const categorySchema = require("../Api/models/category")

//Post by admin
router.post("/create",async (req,res)=>{
    const category = new categorySchema({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        imageUrl:req.body.imageUrl
    }) 
    await category.save()
    .then(result=>{
        res.status(200).json({
            newCategoty:result
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
   await categorySchema.find()
   .select("_id name imageUrl")
   .then(result=>{
    res.status(200).json({
        Category :result
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
router.delete("/:id",async (req,res)=>{
    await categorySchema.deleteOne({_id:req.params.id})
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

 router.put("/:id", async(req,res)=>{
    await categorySchema.updateOne({_id:req.params.id},req.body)
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

 router.get("/get/count",(req,res)=>{
    categorySchema.find().countDocuments()
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
 