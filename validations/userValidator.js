const {check} = require("express-validator");

let profileUpdateValidator = [
  check("firstName", "Invalid first name").optional()
  .isLength({min:1, max: 30}).withMessage("First name must be betwwen 1 to 30 characters")
  .isString().trim().escape(),
  check("lastName", "Invalid last name").optional()
  .isLength({min:1, max: 30}).withMessage("Last name must be between 1 to 30 characters")
  .isString().trim().escape(),
  check("phone", "Invalid phone").optional()
  .isLength({min:10, max:10}).withMessage("Phone must be of 10 numeric characters")
  .isMobilePhone("ne-NP").trim().escape(),
]

module.exports  =  {profileUpdateValidator}