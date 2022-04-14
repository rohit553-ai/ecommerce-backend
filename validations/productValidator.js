const {check} = require("express-validator");

let validateProduct = [
  check("name", "Invalid value for name").isLength({min:1}).withMessage("Name is required").isLength({max: 100}).withMessage("Name must have within 100 characters").isString().trim().escape(),
  check("description", "Invalid value for description").optional().isLength({min: 1, max: 254}).withMessage("Description must have within 254 characters").isString().trim().escape(),
  check("categoryId").isLength({min:1}).withMessage("Category Id is required").isNumeric().withMessage("Category id must be numeric"),
  check("quantity").isLength({min:1}).withMessage("Quantity is required").isNumeric().withMessage("Quantity must be numeric"),
  check("price").isLength({min:1}).withMessage("Price is required").isNumeric().withMessage("Price must be numeric"),
  check("tag").optional().isLength({max:50}).withMessage("Tag must not exceed more than 50 characters").isString().withMessage("Invalid value for tag"),
]

module.exports = {
  validateProduct
}