const jwt = require("jsonwebtoken");
const {User} = require("../services");

module.exports = async (req, res, next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token){
    return res.send("test")
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const freshUser = await User.findOne({id: decoded.userId});
  if(!freshUser){
    return res.send("test")
  }

  // if(freshUser.changedPassword(decoded.iat)){
  //   return next(new customError("User recently changed the password, Please login to continue", 401))
  // }
  req.user = freshUser;
  return next();
}