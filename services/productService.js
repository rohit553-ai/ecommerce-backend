const {Product, Category} = require("../models");

let productService = {};

productService.findAll = async(query)=>{
  return await Product.findAll({
    where: query
  });
}

productService.findOne = async(query)=>{
  return await Product.findOne({
    where: query,
    attributes:["id", "name", "description", "picture", "quantity", "unitsSold", "price"],
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

productService.buildQuery = async(req)=>{
  const query = req.query;
}

module.exports = productService;