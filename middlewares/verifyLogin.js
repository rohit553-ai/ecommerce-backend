const jwt = require("jsonwebtoken");
const {userService} = require("../services");
const {CustomError} = require("../helpers")

module.exports.verifyLogin = async (req, res, next)=>{
  try{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
    }
  
    if(!token){
      return next(new CustomError("User not logged in", 401))
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const freshUser = await userService.findOne({id: decoded.userId});
    if(!freshUser){
      return next(new CustomError("User doesn't seem to exist", 404))
    }
  
    // if(freshUser.changedPassword(decoded.iat)){
    //   return next(new customError("User recently changed the password, Please login to continue", 401))
    // }
    req.user = freshUser;
    return next();
  }catch(err){
    console.log(err);
    return res.status(500).json({
      status:"error",
      message:"Failed to authenticate"
    })
  }
}