const {orderService, orderDetailService, productService} = require("../services");
const {sequelize} = require("../models");
const {CustomError} = require("../helpers");

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

module.exports = orderController;