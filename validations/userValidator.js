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

let messageValidator = [
  check("firstName", "Invalid first name").isLength({min:1})
  .isLength({min:1, max: 30}).withMessage("First name must be betwwen 1 to 30 characters")
  .isString().trim().escape(),
  check("lastName", "Invalid last name").isLength({min:1})
  .isLength({min:1, max: 30}).withMessage("Last name must be between 1 to 30 characters")
  .isString().trim().escape(),
  check("phone", "Invalid phone").isLength({min:1})
  .isLength({min:10, max:10}).withMessage("Phone must be of 10 numeric characters")
  .isMobilePhone("ne-NP").trim().escape(),
  check("salutation", "Invalid salutation").isLength({min:1}).withMessage("Salutation is required").isString().trim().escape(),
  check("country", "Invalid value for country").optional().isLength({min: 1, max: 100}).withMessage("Country should have characters betwwen 1 to 100").isString().trim().escape(),
  check("message", "Invalid value for message").isLength({min:1}).withMessage("Message is required").isLength({max: 255}).withMessage("Message cant exceed 255 characters")
]

module.exports  =  {profileUpdateValidator, messageValidator}