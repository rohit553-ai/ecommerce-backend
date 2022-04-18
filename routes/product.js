const express = require("express");
const {productController, reviewController} = require("../controllers");
const { validateProduct, checkErrors } = require("../validations");
const {wrapAsync} = require("../helpers");
const {upload, resizeImage} = require("../middlewares");
// const { resizeImage } = require("../middlewares/multer");

const productRouter = express.Router();

productRouter.get("/", wrapAsync(productController.getProducts));
productRouter.get("/best-sellers", wrapAsync(productController.bestSellers));
productRouter.get("/latest", wrapAsync(productController.latestProducts));
productRouter.get("/:id", wrapAsync(productController.getSingleProduct));
productRouter.get("/:id/reviews", wrapAsync(reviewController.getProductsReview));
productRouter.post("/", upload.single("picture"), validateProduct, checkErrors, resizeImage, wrapAsync(productController.addNewProduct));
productRouter.patch("/:id", upload.single("picture"), resizeImage, wrapAsync(productController.updateProduct));
productRouter.delete("/:id", wrapAsync(productController.deleteProduct));

module.exports = productRouter;