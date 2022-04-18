const {orderService, orderDetailService, productService} = require("../services");
const {sequelize} = require("../models");
const {CustomError} = require("../helpers");
const order = require("../models/order");

let orderController = {};

orderController.newOrder = async(req, res, next)=>{
  const {products, subTotal, estimatedTax, estimatedTotal, deliveryAddress} = req.body;

  const result = await sequelize.transaction(async(t)=>{
    const order = await orderService.create({
      subTotal,
      estimatedTax,
      estimatedTotal,
      deliveryAddress,
      userId: req.user.id
    }, {transaction: t})

    for(let i = 0; i<products.length; i++){
      const product = await productService.findOne({
        id: products[i].id
      });
      if(!product){
        throw new CustomError("Cannot find product in order", 404)
      }
      if(product.quantity==0 || product.quantity<products[i].quantity){
        throw new CustomError(`${product.name} is out of stock or less in stock`, 400)
      }
      let leftQuantity = product.quantity - products[i].quantity;
      let unitsSold = product.unitsSold + products[i].quantity;

      let dataToUpdate = {
        quantity: leftQuantity,
        unitsSold: unitsSold
      }
      await orderDetailService.createOne({
        orderId: order.id,
        productId: products[i].id,
        quantity: products[i].quantity
      }, {transaction: t})

      await productService.updateWithTransaction({id: products[i].id}, dataToUpdate, t)
    }

    return order;
  })
  if(result){
    return res.status(200).json(result)
  }else{
    return next(new CustomError("Something went wrong when creating an order please try again", 400))
  }
}

orderController.getAllOrders = async(req, res, next)=>{
  let query = {};
  const filter = orderService.buildFilterQuery(req);
  query.where = filter;
  const orders = await orderService.findAll(query);

  return res.status(200).json(orders);
}

orderController.getSingleOrder = async(req, res, next)=>{
  const order = await orderService.findOne({
    id: req.params.id
  });
  
  if(!order){
    return next(new CustomError("Order doesn't exist, Please try again!", 404))
  }

  return res.status(200).json(order);
}

orderController.updateOrder = async(req, res, next)=>{
  const {status, paymentStatus} = req.body;

  let order = await orderService.findOne({
    id: req.params.id
  });
  
  if(!order){
    return next(new CustomError("Order doesn't exist, Please try again!", 404))
  }

  status? order.status = status: null;
  paymentStatus? order.paymentStatus = paymentStatus:null;

  order = await order.save();

  return res.status(200).json(order);
}

module.exports = orderController;