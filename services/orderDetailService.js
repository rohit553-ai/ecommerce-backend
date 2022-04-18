const {OrderDetail} = require("../models");

let orderDetailService = {};

orderDetailService.bulkAdd = async(data, tran)=>{
  return await OrderDetail.bulkCreate(data, tran);
}

orderDetailService.createOne = async(data, tran)=>{
  return await OrderDetail.create(data, tran)
}

module.exports = orderDetailService;