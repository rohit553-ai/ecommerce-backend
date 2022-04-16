const {WishList} = require("../models");

let wishListService = {};

wishListService.newWish = async(data)=>{
  const newWish = await WishList.create(data);
  return newWish;
}

wishListService.getUsersWishList = async(userId)=>{
  const wishLists = await WishList.findAll({
    where: {
      userId
    }
  });
  return wishLists;
}

wishListService.findOne = async(query)=>{
  return await WishList.findOne({
    where: query
  })
}

wishListService.delete = async(query)=>{
  return await WishList.destroy({
    where: query
  })
}

module.exports =wishListService;