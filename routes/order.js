const {orderController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const {verifyLogin} = require("../middlewares");
const {validateNewOrder, checkErrors} = require("../validations");
const express = require("express");

const orderRouter = express.Router();

orderRouter.post("/", verifyLogin, validateNewOrder, checkErrors, wrapAsync(orderController.newOrder));

module.exports = orderRouter;