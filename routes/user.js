const express = require("express");
const {verifyLogin} = require("../middlewares");
const {userController} = require("../controllers");

const userRouter = express.Router();

userRouter.get("/me", verifyLogin, userController.me);
userRouter.get("/my/wish-list", verifyLogin, userController.getMyWishList);
userRouter.post("/new-wish", verifyLogin, userController.addProductToWishList);

module.exports = userRouter;