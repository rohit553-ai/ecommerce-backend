const {check} = require("express-validator"); 

const validateNewReview = [
  check("reviewMessage").optional().isString().withMessage("Invalid value for review message").isLength({
    min:1, max:255
  }).withMessage("Review message must be between 1 to 255 characters"),
  check("ratings").optional().isNumeric().withMessage("Invalid value for ratings").custom((value, {req})=>{
    if(value < 0 || value>5){
      return Promise.reject("Ratings must be betweem 0 to 5")
    }
    return Promise.resolve();
  }),
  check("productId").isLength({min:1}).withMessage("ProductId is required").isNumeric().withMessage("Invalid value for product id")
]

module.exports = {
  validateNewReview
}