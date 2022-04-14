const  {userService, mailService} = require("../services");
const bcrypt = require("bcrypt");
const { tokenHelper, CustomError } = require("../helpers");
const jwt = require("jsonwebtoken");

let authController = {};

authController.login = async(req, res, next)=>{
  let user = await userService.findOne({email:req.body.email, emailVerified: true});
  if(!user){
    return next(new CustomError("Email or password doesn't match", 400))
  }

  let passwordMatches = bcrypt.compareSync(req.body.password, user.password);
  if(!passwordMatches){
    return next(new CustomError("Email or password doesn't match", 400))
  }
  const jwtToken = jwt.sign({userId: user.id, role:user.role}, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })
  return res.status(200).json({
    token: jwtToken
  })
}

authController.register = async (req, res, next)=>{
  let user = await userService.findOne({
    email: req.body.email,
  })

  if(user){
    if(user.emailVerified){
      return next(new CustomError("Email already in use", 400))
    }else{
      await userService.delete({id: user.id})
    }
  }

  let userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    emailVerified: true
  }

  const newUser = await userService.add(userData);

  // mailService.sendMail(newUser.email, "verify", otp)
  return res.status(200).json(newUser)
}

authController.verifyEmail = async(req, res, next)=>{
  
}

module.exports = authController;