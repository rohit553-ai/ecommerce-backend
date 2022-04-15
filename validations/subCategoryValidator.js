const {check} = require("express-validator");

let subCategoryValidator = [
  check("name").isLength({min:1}).withMessage("Name is required").isLength({max: 100}).withMessage("Name must not exceed more than 100 characters").trim().escape(),
  check("categoryId").isLength({min:1}).withMessage("Category id is required").isNumeric().withMessage("Invalid value for categoryId").trim().escape()
]

let updateSubCategoryValidator = [
  check("name").optional().isLength({min:1}).withMessage("Name field cannot be empty").isLength({max: 100}).withMessage("Name must not exceed more than 100 characters").trim().escape(),
  check("categoryId").optional().isLength({min:1}).withMessage("Category id field cannot be empty").isNumeric().withMessage("Invalid value for categoryId").trim().escape()
]

module.exports = {
  subCategoryValidator,
  updateSubCategoryValidator
}
