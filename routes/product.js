const express = require("express");
const {productController} = require("../controllers");
const { validateProduct, checkErrors } = require("../validations");
const {wrapAsync} = require("../helpers")

const productRouter = express.Router();

productRouter.get("/", wrapAsync(productController.getProducts));
productRouter.get("/:id", wrapAsync(productController.getSingleProduct));
productRouter.post("/", validateProduct, checkErrors, wrapAsync(productController.addNewProduct));
productRouter.patch("/:id", wrapAsync(productController.updateProduct));
productRouter.delete("/:id", wrapAsync(productController.deleteProduct));

module.exports = productRouter;