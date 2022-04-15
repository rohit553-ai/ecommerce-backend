const express = require("express");
const {subCategoryController} = require("../controllers");
const {subCategoryValidator, updateSubCategoryValidator, checkErrors} = require("../validations")
const subCategoryRouter = express.Router();
const {wrapAsync} = require("../helpers")

subCategoryRouter.get("/", wrapAsync(subCategoryController.getAllSubCategories));
subCategoryRouter.get("/:id", wrapAsync(subCategoryController.getSingleSubCategories));
subCategoryRouter.post("/", subCategoryValidator, checkErrors, wrapAsync(subCategoryController.postSubCategories));
subCategoryRouter.patch("/:id", updateSubCategoryValidator, checkErrors, wrapAsync(subCategoryController.updateSubCategory));
subCategoryRouter.delete("/:id", wrapAsync(subCategoryController.deleteSubCategory));

module.exports = subCategoryRouter;