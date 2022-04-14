const {CustomError} = require("../helpers")

module.exports.checkRole = function(role){
  return (req, res, next)=>{
    if(req.user.role !== role){
      return next(new CustomError("User not authorized for the task", 401))
    }
    return next();
  }
}