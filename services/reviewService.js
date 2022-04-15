const { Review } = require("../models");

let reviewService = {};

reviewService.findAll = async(query)=>{
  return await Review.findAll({
    where: query
  });
}

reviewService.findOne = async(query)=>{
  return await Review.findOne({
    where: query
  });
}

reviewService.add = async(data)=>{
  return await Review.create(data);
}

reviewService.delete = async(query)=>{
  return await Review.destroy({
    where: query
  });
}

module.exports =  reviewService;