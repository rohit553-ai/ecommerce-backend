const {subCategoryService, categoryService} = require("../services");
const {CustomError} = require("../helpers");
const { Op } = require("sequelize");

let subCategoryController = {};

subCategoryController.getAllSubCategories = async(req, res, next)=>{
  const categories = await subCategoryService.findAll();
  return res.status(200).json(categories);
}

subCategoryController.getSingleSubCategories = async(req, res, next)=>{
  const category = await subCategoryService.findOne({
    id: req.params.id
  });
  if(!category){
    return next(new CustomError("Cant find category with given id", 404));
  }

  return res.status(200).json(category);
}

subCategoryController.postSubCategories = async(req, res, next)=>{
  const {name, categoryId} =req.body;
  const category = await categoryService.findOne({
    id: categoryId
  })

  if(!category){
    return next(new CustomError("Category with given id not found", 404))
  }

  const subCategory = await subCategoryService.findOne({
    name,
    categoryId
  });

  if(subCategory){
    return next(new CustomError("A sub category for given category already exists with same name", 400))
  }

  const newSubCategory = await subCategoryService.add({name, categoryId});

  return res.status(200).json(newSubCategory);
}

subCategoryController.updateSubCategory = async(req, res, next)=>{
  let subCategory = await subCategoryService.findOne({
    id: req.params.id
  })

  if(!subCategory){
    return next(new CustomError("Cant find sub category with given id", 404));
  }

  if(req.body.name){
    let query = {
      name: req.body.name,
      id:{
        [Op.ne]: subCategory.id
      }
    }
    if(!req.body.categoryId){
        query.categoryId = subCategory.categoryId
    }else{
        query.categoryId = req.body.categoryId
    }

    const subCatInDB = await subCategoryService.findOne(query);
    if(subCatInDB){
      return next(new CustomError("A sub category for given category already exists with same name", 400));
    }
    subCategory.name = req.body.name;
  }
  if(req.body.categoryId){
    subCategory.categoryId = req.body.categoryId
  }
  subCategory = await subCategory.save();
  return res.status(200).json(subCategory);
}

subCategoryController.deleteSubCategory = async(req, res, next)=>{
  const subCategory = await subCategoryService.findOne({
    id: req.params.id
  })

  if(!subCategory){
    return next(new CustomError("Cant find sub category with given id", 404));
  }
  await subCategoryService.delete({id: subCategory.id});
  return res.status(200).json({
    status:"success",
    data: null
  });
}

module.exports = subCategoryController;

