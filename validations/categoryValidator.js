const {check} = require("express-validator");

let categoryValidator = [
  check("name").isLength({min:1}).withMessage("Name is required").isLength({max: 100}).withMessage("Name must not exceed more than 100 characters").trim().escape()
]

let updateCategoryValidator = [
  check("name").optional().isLength({min:1}).withMessage("Name is required").isLength({max: 100}).withMessage("Name must not exceed more than 100 characters").trim().escape()
]

module.exports = {
  categoryValidator,
  updateCategoryValidator
}
