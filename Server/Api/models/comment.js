const mongoose = require("mongoose");


const commentSchema  = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
email:{
    type:String,
    require:true
},
commentText:{
    type:String,
    require:true
},
postId:{
    type:String,
    require:true
},
timeStamp:{
    type:Date,
    default:Date.now()
}
})




module.exports = mongoose.model("Comment",commentSchema)