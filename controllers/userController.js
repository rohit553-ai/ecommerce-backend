
const {productService, wishListService, userService} = require("../services");
const {CustomError} = require("../helpers")

let userController = {};

userController.me = async(req, res, next)=>{
  return res.status(200).json(req.user);
}

userController.addProductToWishList = async(req, res, next) => {
  const userId = req.user.id;

  const product = await productService.findOne({id: req.body.productId});

  if(!product){
    return next(new CustomError("The product doesn't exist", 404))
  }

  const checkWishList = await wishListService.findOne({
    userId,
    productId: product.id
  });

  if(checkWishList){
    return next(new CustomError("Product already added to user's checklist", 400))
  }
  const newWish = await wishListService.newWish({
    userId,
    productId : product.id
  })

  return res.status(200).json(newWish);
}

userController.getMyWishList = async(req, res, next)=>{
  let myWishList = await userService.getWishList(req.user.id);
  return res.status(200).json(myWishList);
}

module.exports = userController;