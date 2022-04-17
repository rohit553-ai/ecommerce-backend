const express = require("express");
const reviewRouter = express.Router();

const {validateNewReview, checkErrors} = require("../validations")
const {reviewController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const { verifyLogin } = require("../middlewares");

reviewRouter.post("/", verifyLogin, validateNewReview, checkErrors, wrapAsync(reviewController.newReview));
reviewRouter.get("/top", wrapAsync(reviewController.getTopReviews));

module.exports = reviewRouter;