const { categoryService } = require("../services");

let categoryController = {};

categoryController.getAllCategories = async (req, res, next) => {
  const categories = await categoryService.findAll();
  return res.status(200).json(categories);
};

categoryController.getSingleCategories = async (req, res, next) => {
  const category = await categoryService.findOne({
    id: req.params.id,
  });
  if (!category) {
    return next(new Error("Category not found!"));
  }

  return res.status(200).json(category);
};

categoryController.postCategories = async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await categoryService.add({ name });

  return res.status(200).json(newCategory);
};

categoryController.updateCategory = async (req, res, next) => {
  let category = await categoryService.findOne({
    id: req.params.id,
  });

  if (!category) {
    return next(new Error("Something went wrong!"));
  }

  if (req.body.name) {
    category.name = req.body.name;
  }
  category = await category.save();
  return res.status(200).json(category);
};

categoryController.deleteCategory = async (req, res, next) => {
  const category = await categoryService.findOne({
    id: req.params.id,
  });

  if (!category) {
    return next(new Error("Something went wrong!"));
  }
  await categoryService.delete({ id: category.id });
  return res.status(200).json({
    status: "success",
    data: null,
  });
};

module.exports = categoryController;
