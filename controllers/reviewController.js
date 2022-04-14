const {reviewService, userService, productService} = require("../services");
const {CustomError} = require("../helpers")

let reviewController = {};

reviewController.newReview = async(req, res, next)=>{
  let reviewData = {
    reviewMessage: req.body.reviewMessage,
    ratings: req.body.ratings,
    userId: req.user.id
  }

  const product = await productService.findOne({id: req.body.productId});
  if(!product){
    return next(new CustomError("Product doesn't exist", 404))
  }

  const userReview = await reviewService.findOne({
    userId: req.user.id,
    productId: req.body.productId
  })

  if(userReview){
    return next(new CustomError("Review for this product already exist."))
  }
  reviewData.productId = product.id;

  const newReview = await reviewService.add(reviewData);
  return res.status(200).json(newReview);
}

reviewController.getProductsReview = async(req, res, next)=>{
  const reviews = await reviewService.findAll({
    productId: req.params.id
  });
  return res.status(200).json(reviews);
}