const express = require("express");
const categoryController = require("../controllers/categoryController");
const {checkErrors, categoryValidator, updateCategoryValidator} = require("../validations")
const categoryRouter = express.Router();
const {wrapAsync} = require("../helpers")

categoryRouter.get("/", wrapAsync(categoryController.getAllCategories));
categoryRouter.get("/:id", wrapAsync(categoryController.getSingleCategories));
categoryRouter.post("/", categoryValidator, checkErrors, wrapAsync(categoryController.postCategories));
categoryRouter.patch("/:id", updateCategoryValidator, checkErrors, wrapAsync(categoryController.updateCategory));
categoryRouter.delete("/:id", wrapAsync(categoryController.deleteCategory));

module.exports = categoryRouter;