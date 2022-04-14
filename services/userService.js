const {User, WishList, Product} = require("../models");

let userService = {};

userService.findOne = async(query)=>{
  const user = await User.findOne({
    where: query
  })
  return user;
}

userService.add = async(data) =>{
  let user = await User.create(data);
  return user;
}

userService.delete = async(query)=>{
  return await User.destroy({
    where:query
  })
}

userService.update = async(data, query)=>{
  const user = await User.update(data, {
    where:query,
    returning: true
  });
  return user;
}

userService.getWishList = async(id)=>{
  const myWishList = await User.findOne({
    where:{
      id
    },
    attributes:["id", "firstName", "lastName", "email"],
    include:{
      model: WishList,
      as: "wishLists",
      attributes: ["id", "userId"],
      include:{
        model: Product,
        as:"product",
        attributes: ["id", "name", "price", "picture"]
      }
    }
  })
  return myWishList;
}

module.exports = userService;