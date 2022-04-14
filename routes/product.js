const express = require("express");
const {productController} = require("../controllers");


const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getSingleProduct);
productRouter.post("/", productController.addNewProduct);
productRouter.patch("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;