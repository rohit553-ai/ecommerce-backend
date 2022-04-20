const {Product, Category, SubCategory} = require("../models");
const {Op} = require("sequelize")

let productService = {};

productService.findAll = async(query)=>{
  return await Product.findAll({
    where: query.where,
    include:{
      model: Category,
      as:"category",
      attributes: ["id", "name"]
    },
    include:{
      model: SubCategory,
      as:"subCategory",
      attributes: ["id", "name"]
    },
    limit: query.limit,
    offset: query.offset,
    order: query.sort
  });
}

productService.findOne = async(query)=>{
  return await Product.findOne({
    where: query,
    attributes:["id", "name", "description", "picture", "quantity", "unitsSold", "price", "tag"],
    include:{
      model : Category,
      as: "category",
      attributes: ["id", "name"]
    }
  });
}

productService.add = async(data)=>{
  return await Product.create(data);
}

productService.delete = async(query)=>{
  return await Product.destroy({
    where: query
  });
}

productService.buildQuery = (req)=>{
  const query = req.query;
  let filter = {};
  if(query.category){
    filter.categoryId = query.category;
  }
  if(query.subCategory){
    filter.subCategoryId = query.subCategory;
  }
  if(query.minPrice){
    filter.price = {
      [Op.gte] : parseInt(query.minPrice.trim())
    }
  }
  if(query.maxPrice){
    filter.price = {
      [Op.lte] : parseInt(query.maxPrice.trim())
    }
  }
  if(query.minPrice && query.maxPrice){
    filter.price = {
      [Op.gte] : parseInt(query.minPrice.trim()),
      [Op.lte] : parseInt(query.maxPrice.trim()),
    }
  }
  if(query.name){
    filter.name = {
      [Op.like]: `%${query.name.trim()}%`
    }
  }
  if(query.tag){
    filter.tag = query.tag;
  }
  return filter;
}

productService.count = async(query)=>{
  return await Product.count({
    where: query
  })
}

productService.updateWithTransaction = async(query, data, t)=>{
  return await Product.update(data, {
    where: query,
    transaction: t
  })
}

module.exports = productService;