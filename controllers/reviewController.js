const {reviewService, userService, productService} = require("../services");
const {CustomError} = require("../helpers")

let reviewController = {};

reviewController.newReview = async(req, res, next)=>{
  if(!req.body.reviewMessage && !req.body.ratings){
    return next(new CustomError("Either ratings or review message is required"));
  }

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
    return next(new CustomError("You have already provided a review for this product", 400))
  }
  reviewData.productId = product.id;

  const newReview = await reviewService.add(reviewData);
  return res.status(200).json(newReview);
}

reviewController.getProductsReview = async(req, res, next)=>{
  const pageLimit = 10;
  const currentPage = req.query && req.query.page ? Number(req.query.page) : 1;

  const product = await productService.findOne({id: req.params.id});
  if(!product){
    return next(new CustomError("Product doesn't exist", 404))
  }
  const averageRating = Number((await reviewService.getAverageRatings(product.id))).toFixed(1);
  let data = {
    totalPages: 1,
    currentPage: currentPage,
    pageLimit: pageLimit,
    product,
    averageRating,
    reviews:[]
  };
  const filterQuery = {
    productId: req.params.id
  };

  const query = {
    where: filterQuery,
    limit: pageLimit,
    offset: pageLimit * (currentPage - 1),
  };
  const reviews = await reviewService.findAll(query);
  data.reviews = reviews;
  return res.status(200).json(data);
}

reviewController.getTopReviews = async(req, res, next)=>{
  let query = {};
  query.limit = 5;
  query.sort = [["ratings", "DESC"]];

  const ratings = await reviewService.findAll(query);
  return res.status(200).json(ratings);
}

reviewController.update = async(req, res, next)=>{
  let query = {
    id: req.prams.id,
    userId: req.user.id
  }
  const review = await reviewService.findOne(query);

  if(!review){
   
    return next(new CustomError("Cannot find the review", 404))
  }

  let {reviewMessage, ratings} =req.body;

  reviewMessage? review.reviewMessage = reviewMessage : null;
  ratings? review.ratings = ratings: null;

  const result = await review.save();
  return res.status(200).json(result);
}

reviewController.delete = async(req, res, next)=>{
  let query = {
    id: req.prams.id,
    userId: req.user.id
  }
  const review = await reviewService.findOne(query);

  if(!review){
    return next(new CustomError("Cannot find the review", 404))
  }

  await reviewService.delete(query);
  return res.status(200).json({
    status:"success",
    data: null
  })
}

module.exports = reviewController;

//
//Order, OrderDetails, Billing

//Order => id, status => [pending, onProgress, delivered, cancelled], subTotal, estimatedTax, estimatedTotal, userId, paymentStatus, paymentMethod

//OrderDetails => id, orderId, product, quantity