const {check} = require("express-validator");
const product = require("../models/product");

let validateNewOrder = [
  check("products").exists().isArray().withMessage("Products must be passed in array").custom(value => {
    if(value.length<=0){
      return Promise.reject("Products array cannot be empty")
    }
    let invalidIds = [];
    let invalidQuantity = []
    value.forEach(product=>{
      if(typeof product.id !== "number"){
        invalidIds.push(product.id)
      }
      if(typeof product.quantity !== "number"){
        invalidQuantity.push(product.quantity)
      }
    });

    if(invalidIds.length>0 && invalidQuantity.length){
      return Promise.reject("Invalid product and quantity passed in order")
    }

    if(invalidIds.length>0){
      return Promise.reject("Invalid products in order")
    }
    if(invalidQuantity.length>0){
      return Promise.reject("Invalid quantity passed in order")
    }
    return Promise.resolve();
  }),
  check("subTotal").isLength({min:1}).withMessage("Sub total is required").isNumeric().withMessage("Invalid value for sub total"),
  check("estimatedTax").isLength({min:1}).withMessage("Estimated tax is required").isNumeric().withMessage("Invalid value for estimated tax"),
  check("estimatedTotal").isLength({min:1}).withMessage("Estimated total is required").isNumeric().withMessage("Invalid value for estimated total"),
  check("deliveryAddress", "Invalid value for delivery address").isLength({min:1}).withMessage("Delivery address is required").isLength({max:254}).withMessage("Delivery address should be less than 254 characters").isString()
];

let validateUpdateOrder = [
  check("status").optional().isLength({min:1, max:15}).withMessage("Status should be between 1 to 15 char").custom(value=>{
    let acceptedStatus = ["pending", "onProgress", "delivered", "cancelled"]
    if(acceptedStatus.indexOf(value)<=-1){
      return Promise.reject("Invalid value for status")
    }
    return Promise.resolve();
  }),
  check("paymentStatus").optional().isLength({min:1, max:15}).withMessage("Payment Status should be between 1 to 15 char").custom(value=>{
    let acceptedStatus = ["paid", "unpaid"]
    if(acceptedStatus.indexOf(value)<=-1){
      return Promise.reject("Invalid value for payment status")
    }
    return Promise.resolve();
  })
]

module.exports = {
  validateNewOrder,
  validateUpdateOrder
}