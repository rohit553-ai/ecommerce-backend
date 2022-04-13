const {Category} = require("../models");

let categoryService = {};

categoryService.findAll = async()=>{
  return await Category.findAll();
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