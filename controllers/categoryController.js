const {categoryService, subCategoryService, productService} = require("../services");
const {CustomError} = require("../helpers");
const { Op } = require("sequelize");

let categoryController = {};

categoryController.getAllCategories = async (req, res, next) => {
  const categories = await categoryService.findAll();
  return res.status(200).json(categories);
};

categoryController.getSingleCategories = async (req, res, next) => {
  const category = await categoryService.findOne({
    id: req.params.id,
  });
  if(!category){
    return next(new CustomError("Cant find category with given id", 404));
  }

  return res.status(200).json(category);
};

categoryController.postCategories = async(req, res, next)=>{
  const {name} =req.body;
  const category = await categoryService.findOne({
    name
  })

  if(category){
    return next(new CustomError("Category name already in use", 400))
  }
  const newCategory = await categoryService.add({name});

  return res.status(200).json(newCategory);
};

categoryController.updateCategory = async (req, res, next) => {
  let category = await categoryService.findOne({
    id: req.params.id,
  });

  if(!category){
    return next(new CustomError("Cant find category with given id", 404));
  }

  if(req.body.name){
    const categoryInDB = await categoryService.findOne({
      name: req.body.name,
      id: {
        [Op.ne]: category.id
      }
    })
  
    if(categoryInDB){
      return next(new CustomError("Category name already in use", 400))
    }
    category.name = req.body.name;
  }
  category = await category.save();
  return res.status(200).json(category);
};

categoryController.deleteCategory = async (req, res, next) => {
  const category = await categoryService.findOne({
    id: req.params.id,
  });

  if(!category){
    return next(new CustomError("Cant find category with given id", 404));
  }
  
  await category.destroy();
  return res.status(200).json({
    status: "success",
    data: null,
  });
};

categoryController.getSubCategories = async (req, res, next) => {
  const category = await categoryService.findOne({
    id: req.params.id,
  });

  if(!category){
    return next(new CustomError("Cant find category with given id", 404));
  }

  const subCategories = await subCategoryService.findAll({
    categoryId : category.id
  });

  return res.status(200).json(subCategories)
}

module.exports = categoryController;
