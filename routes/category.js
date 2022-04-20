const express = require("express");
const categoryController = require("../controllers/categoryController");
const {checkErrors, categoryValidator, updateCategoryValidator} = require("../validations")
const categoryRouter = express.Router();
const {wrapAsync} = require("../helpers");
const { verifyLogin } = require("../middlewares/verifyLogin");

categoryRouter.get("/", wrapAsync(categoryController.getAllCategories));
categoryRouter.get("/:id", wrapAsync(categoryController.getSingleCategories));
categoryRouter.get("/:id/sub-categories", wrapAsync(categoryController.getSubCategories));

categoryRouter.post("/", verifyLogin, categoryValidator, checkErrors, wrapAsync(categoryController.postCategories));
categoryRouter.patch("/:id", verifyLogin, updateCategoryValidator, checkErrors, wrapAsync(categoryController.updateCategory));
categoryRouter.delete("/:id", verifyLogin, wrapAsync(categoryController.deleteCategory));

module.exports = categoryRouter;