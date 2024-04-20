const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    console.log(req.headers.authorization);
    try {
        const token  = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,"I am yash this is my secret key")
        console.log(verify);
        if(verify.userType == "user")
        {
            next()
        }
        else{
            return res.status(500).json({
                error:"user is not valid"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"not a valid user"
        })
    }
}