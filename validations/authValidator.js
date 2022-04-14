const {check} = require("express-validator");

let loginValidator = [
  check("email", "Invalid value for email")
  .isLength({min:1}).withMessage("Email is required")
  .isLength({max: 100}).withMessage("Email can't exceed 100 characters").isEmail().trim().escape(),
  check("password")
  .isLength({min:1}).withMessage("Password is required")
  .isLength({max: 16}).withMessage("Password must not exceed 16 characters").trim().escape()
];

let registerValidator = [
  check("firstName", "Invalid first name")
  .isLength({min:1}).withMessage("First name is required")
  .isLength({max: 30}).withMessage("First name must not exceed 30 characters")
  .isString().trim().escape(),
  check("lastName", "Invalid last name")
  .isLength({min:1}).withMessage("Last name is required")
  .isLength({max: 30}).withMessage("Last name must not exceed 30 characters")
  .isString().trim().escape(),
  check("email", "Invalid email")
  .isLength({min:1}).withMessage("Email is required")
  .isEmail().trim().escape(),
  check("password", "Invalid password")
  .isLength({min:1}).withMessage("Password is required")
  .isLength({max: 16}).withMessage("Password must not exceed 16 characters")
  .isString().trim().escape()
]

module.exports = {loginValidator, registerValidator}