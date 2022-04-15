const {Category, SubCategory} = require("../models");

let categoryService = {};

categoryService.findAll = async()=>{
  return await Category.findAll({
    include: {
      model: SubCategory,
      as: "subCategories",
      attributes:["id", "name"]
    }
  });
}

categoryService.findOne = async(query)=>{
  return await Category.findOne({
    where: query
  });
}

categoryService.add = async(data)=>{
  return await Category.create(data);
}

categoryService.delete = async(query)=>{
  return await Category.destroy({
    where: query
  });
}

module.exports = categoryService;