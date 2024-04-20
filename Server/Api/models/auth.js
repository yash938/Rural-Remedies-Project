const mongoose = require("mongoose");


const authSchema  = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
fullname:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
contact:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
}
})




module.exports = mongoose.model("Auth",authSchema)