const express = require("express")
const router = express.Router();
const mongoose = require("mongoose") 
const bcrypt = require("bcrypt")
const User = require("../Api/models/auth")
const jwt = require("jsonwebtoken")


//USER SIGNUP
router.post("/user/signup",(req,res)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err)
    {
        return res.status(400).json({
            error:err
        })
    }
    else{
        const user  = new User({
            _id:new mongoose.Types.ObjectId,
            fullName:req.body.fullName,
            email:req.body.email,
            contact:req.body.contact,
            password:hash
        })
     user.save()
     .then(result=>{
        res.status(200).json({
            newUser:result
        })
     })
     .catch(err=>{
        console.log(err);
        res.status(404).json({
            error:err
        })
     })
    }
})
})



//login user

router.post("/user/login",(req,res)=>{
    User.find({email:req.body.email})
    .then(user=>{
        console.log(user)
        if(user.length < 1){
            return res.status(404).json({
                msg:"user not found"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(404).json({
                    msg:"password matching failed"
                })
            }
            const token = jwt.sign({
                email:user[0].email,
                fullName:user[0].fullName
            },
            'I am yash this is my secret key',
            {
                expiresIn:'365d'
            })
            res.status(200).json({
                email:user[0].email,
                fullName:user[0].fullName,
                token:token
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({
            error:err
        })
    })
})



//admin login
router.post("/admin/login",(req,res)=>{
    if(req.body.userName == "yash32860@gmail.com" && req.body.password == "yash1234")
    {
        const token = jwt.sign({
            email:"yash32860@gmail.com",
            fullName:"yash sharma"
        },
        'I am yash this is my secret key',
        {
            expiresIn:'365d'
        })
        return res.status(200).json({
            email:"yash32860@gmail.com",
            fullName:"yash sharma",
            token:token
        })
    }
    res.status(402).json({
        msg:"bad request"
    })
})



module.exports = router;