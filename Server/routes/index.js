const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const post = require("../Api/post")
const category = require('../Api/category')

const URI = "mongodb://localhost:27017/Home-Remedies"
mongoose.connect(URI)
mongoose.connection.on('connected',()=>{
    console.log("connected with database with port :" + URI)
})
mongoose.connection.on('error',(err)=>{
    console.log("connection Failed")
    console.log(err)
})




router.use("/remedies", post);
router.use("/category",category)

router.get('/', function(req, res) {
    res.send('Admin dashboard');
  });

module.exports = router;
