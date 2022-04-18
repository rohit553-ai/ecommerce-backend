const {Order} = require("../models");

let orderService = {};

orderService.create = async(data, tran)=>{
  const order = Order.create(data, tran);
  return order;
}


module.exports = orderService;