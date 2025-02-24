const {orderController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const {verifyLogin} = require("../middlewares");
const {validateNewOrder, validateUpdateOrder, checkErrors} = require("../validations");
const express = require("express");

const orderRouter = express.Router();

orderRouter.get("/", verifyLogin, wrapAsync(orderController.getAllOrders));
orderRouter.post("/", verifyLogin, validateNewOrder, checkErrors, wrapAsync(orderController.newOrder));
orderRouter.post("/wallet", verifyLogin, validateNewOrder, checkErrors, wrapAsync(orderController.orderWithKhalti));
orderRouter.get("/:id", verifyLogin, wrapAsync(orderController.getSingleOrder));
orderRouter.patch("/:id", verifyLogin, validateUpdateOrder, checkErrors, wrapAsync(orderController.updateOrder));
orderRouter.patch("/:id/cancel", verifyLogin, wrapAsync(orderController.cancelOrder));

module.exports = orderRouter;