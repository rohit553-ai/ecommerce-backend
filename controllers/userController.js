
const {productService, wishListService, userService} = require("../services");
const {CustomError} = require("../helpers")

let userController = {};

userController.me = async(req, res, next)=>{
  return res.status(200).json(req.user);
}

userController.updateProfile = async(req, res, next)=>{
  const user = req.user;
  
  const {firstName, lastName, phone} = req.body;

  console.log(firstName, lastName, phone)
  firstName? user.firstName = firstName: null;
  lastName? user.lastName = lastName : null;

  if(phone){
    const userPhone = await userService.findOne({
      phone
    });
    if(userPhone){
      return next(new CustomError("The phone number is already in use", 400))
    }
    user.phone = phone;
  }
  req.user = await user.save();
  console.log(req.user)
  return res.status(200).json(req.user)
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

userController.deleteMyWish = async(req, res, next)=>{
  const userId = req.user.id;
  const wishListId = req.params.id;

  const wish = await wishListService.findOne({
    userId,
    id: wishListId
  })

  if(!wish){
    return next(new CustomError("Can't find the product in wishlist", 404))
  }
  await wishListService.delete({
    where: {
      userId,
      id: wishListId
    }
  })
  return res.status(200).json({
    status:"success",
    data: null
  })
}

module.exports = userController;