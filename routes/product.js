const express = require("express");
const {productController, reviewController} = require("../controllers");
const { validateProduct, checkErrors } = require("../validations");
const {wrapAsync} = require("../helpers");
const {upload, resizeImage} = require("../middlewares");
const { verifyLogin } = require("../middlewares");
// const { resizeImage } = require("../middlewares/multer");

const productRouter = express.Router();

productRouter.get("/", wrapAsync(productController.getProducts));
productRouter.get("/best-sellers", wrapAsync(productController.bestSellers));
productRouter.get("/latest", wrapAsync(productController.latestProducts));
productRouter.get("/back-in-stock", wrapAsync(productController.backInStock));
productRouter.get("/:id", wrapAsync(productController.getSingleProduct));
productRouter.get("/:id/reviews", wrapAsync(reviewController.getProductsReview));
productRouter.post("/", verifyLogin, upload.single("picture"), validateProduct, checkErrors, resizeImage, wrapAsync(productController.addNewProduct));
productRouter.patch("/:id", verifyLogin, upload.single("picture"), resizeImage, wrapAsync(productController.updateProduct));
productRouter.delete("/:id", verifyLogin, wrapAsync(productController.deleteProduct));

module.exports = productRouter;