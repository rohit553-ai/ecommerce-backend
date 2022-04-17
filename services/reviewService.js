const { Review, User, Sequelize } = require("../models");

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
    },
    order: query.sort
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

reviewService.getAverageRatings = async (productId)=>{
  const data = await Review.findAll({
    where:{
      productId,
    },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('ratings')), 'avgRating'],
    ],
  });
  return data[0].dataValues.avgRating;
}

module.exports =  reviewService;