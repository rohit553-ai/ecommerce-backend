const express = require("express");
const {verifyLogin} = require("../middlewares");
const {userController, orderController} = require("../controllers");
const {profileUpdateValidator, checkErrors, messageValidator} = require("../validations");
const {wrapAsync} = require("../helpers");

const userRouter = express.Router();

userRouter.get("/", verifyLogin, wrapAsync(userController.getAllUsers))
userRouter.get("/me", verifyLogin, userController.me);
userRouter.patch("/me", verifyLogin, profileUpdateValidator, checkErrors, wrapAsync(userController.updateProfile));
userRouter.get("/messages", verifyLogin, wrapAsync(userController.getMessages));
userRouter.post("/messages", verifyLogin, messageValidator, checkErrors, wrapAsync(userController.sendMessages));
userRouter.get("/my/orders", verifyLogin, wrapAsync(orderController.getMyOrders));
userRouter.get("/my/wish-list", verifyLogin, wrapAsync(userController.getMyWishList));
userRouter.delete("/my/wish-list/:id", verifyLogin, wrapAsync(userController.deleteMyWish));
userRouter.post("/new-wish", verifyLogin, wrapAsync(userController.addProductToWishList));
userRouter.get("/:id", wrapAsync(userController.getSingleUser));

module.exports = userRouter;