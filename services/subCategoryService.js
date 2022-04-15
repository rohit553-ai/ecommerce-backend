const {SubCategory} = require("../models");

let subCategoryService = {};

subCategoryService.findAll = async(query)=>{
  return await SubCategory.findAll(
    {
      where: query
    }
  );
}

subCategoryService.findOne = async(query)=>{
  return await SubCategory.findOne({
    where: query
  });
}

subCategoryService.add = async(data)=>{
  return await SubCategory.create(data);
}

subCategoryService.delete = async(query)=>{
  return await SubCategory.destroy({
    where: query
  });
}

module.exports = subCategoryService;