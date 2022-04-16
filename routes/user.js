const express = require("express");
const {verifyLogin} = require("../middlewares");
const {userController} = require("../controllers");
const {profileUpdateValidator, checkErrors} = require("../validations");
const {wrapAsync} = require("../helpers")

const userRouter = express.Router();

userRouter.get("/me", verifyLogin, userController.me);
userRouter.patch("/me", verifyLogin, profileUpdateValidator, checkErrors, wrapAsync(userController.updateProfile));
userRouter.get("/my/wish-list", verifyLogin, wrapAsync(userController.getMyWishList));
userRouter.delete("/my/wish-list/:id", verifyLogin, wrapAsync(userController.deleteMyWish));
userRouter.post("/new-wish", verifyLogin, wrapAsync(userController.addProductToWishList1));

module.exports = userRouter;