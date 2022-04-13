const express = require("express");
const categoryController = require("../controllers/categoryController");
const {checkErrors, categoryValidator, updateCategoryValidator} = require("../validations")
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getSingleCategories);
categoryRouter.post("/", categoryValidator, checkErrors, categoryController.postCategories);
categoryRouter.patch("/:id", updateCategoryValidator, checkErrors, categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;