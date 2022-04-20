const express = require("express");
const {subCategoryController} = require("../controllers");
const {subCategoryValidator, updateSubCategoryValidator, checkErrors} = require("../validations")
const subCategoryRouter = express.Router();
const {wrapAsync} = require("../helpers");
const { verifyLogin } = require("../middlewares");

subCategoryRouter.get("/", wrapAsync(subCategoryController.getAllSubCategories));
subCategoryRouter.get("/:id", wrapAsync(subCategoryController.getSingleSubCategories));
subCategoryRouter.post("/", verifyLogin, subCategoryValidator, checkErrors, wrapAsync(subCategoryController.postSubCategories));
subCategoryRouter.patch("/:id", verifyLogin, updateSubCategoryValidator, checkErrors, wrapAsync(subCategoryController.updateSubCategory));
subCategoryRouter.delete("/:id", verifyLogin, wrapAsync(subCategoryController.deleteSubCategory));

module.exports = subCategoryRouter;