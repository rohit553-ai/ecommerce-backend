const express = require("express");
const {verifyLogin} = require("../middlewares");
const {userController} = require("../controllers");
const {profileUpdateValidator, checkErrors} = require("../validations");

const userRouter = express.Router();

userRouter.get("/me", verifyLogin, userController.me);
userRouter.patch("/me", verifyLogin, profileUpdateValidator, checkErrors, userController.updateProfile);
userRouter.get("/my/wish-list", verifyLogin, userController.getMyWishList);
userRouter.post("/new-wish", verifyLogin, userController.addProductToWishList);

module.exports = userRouter;