const {Order, OrderDetail, Product, User} = require("../models");

let orderService = {};

orderService.create = async(data, tran)=>{
  const order = Order.create(data, tran);
  return order;
}

orderService.findAll = async(query)=>{
  const orders = await Order.findAll({
    where: query.where,
    include:{
      model:User,
      as:"user",
      attributes: ["id", "firstName", "lastName", "email"]
    }
  })
  return orders;
}

orderService.buildFilterQuery = (req)=>{
  let query = req.query;
  let filter = {};
  if(query.status){
    filter.status = query.status
  }
  if(query.paymentStatus){
    filter.paymentStatus = query.paymentStatus
  }
  if(query.paymentMethod){
    filter.queryMethod = query.paymentMethod
  }
}

orderService.findOne = async(query)=>{
  return await Order.findOne({
    where: query,
    include:[{
      model:OrderDetail,
      as:"orderDetails",
      attributes: ["quantity"],
      include:{
        model: Product,
        as:"product",
        attributes:["id", "name", "picture"]
      }},
      {
        model:User,
        as:"user",
        attributes: ["id", "firstName", "lastName", "email"]
      }
    ]
  })
}

module.exports = orderService;