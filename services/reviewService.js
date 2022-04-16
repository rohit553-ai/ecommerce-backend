const { Review, User } = require("../models");

let reviewService = {};

reviewService.findAll = async(query)=>{
  return await Review.findAll({
    where: query.where,
    limit: query.limit,
    offset: query.offset,
    include:{
      model: User,
      as: "user",
      attributes:["id", "firstName", "lastName", "email"]
    }
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