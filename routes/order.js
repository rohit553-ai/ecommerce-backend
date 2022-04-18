const {orderController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const {verifyLogin} = require("../middlewares");
const {validateNewOrder, validateUpdateOrder, checkErrors} = require("../validations");
const express = require("express");

const orderRouter = express.Router();

orderRouter.get("/", verifyLogin, wrapAsync(orderController.getAllOrders));
orderRouter.get("/:id", verifyLogin, wrapAsync(orderController.getSingleOrder));
orderRouter.post("/", verifyLogin, validateNewOrder, checkErrors, wrapAsync(orderController.newOrder));
orderRouter.get("/:id", verifyLogin, validateUpdateOrder, checkErrors, wrapAsync(orderController.updateOrder));

module.exports = orderRouter;