const {orderService, orderDetailService, productService, khaltiService} = require("../services");
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

orderController.orderWithKhalti = async(req, res, next)=>{
  const {products, subTotal, estimatedTax, estimatedTotal, deliveryAddress, payload} = req.body;
  const result = await sequelize.transaction(async(t)=>{
    const order = await orderService.create({
      subTotal,
      estimatedTax,
      estimatedTotal,
      deliveryAddress,
      paymentStaus:"paid",
      paymentMethod:"khalti",
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
    
    const response = await khaltiService.verifyTransaction(payload);

    if(response.status!=="success"){
      throw new CustomError("Failed to verify khalti transaction, Please try ordering again", 400);
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
  const pageLimit = req.query && req.query.limit? Number(req.query.limit) : null;
  const currentPage = req.query && req.query.page ? Number(req.query.page) : 1;

  let data = {
    totalPages: 1,
    currentPage: currentPage,
    orders: [],
  };

  let query = {};
  const filter = orderService.buildFilterQuery(req);
  query.where = filter;

  if(pageLimit){
    data.pageLimit = pageLimit
    query.limit= pageLimit;
    query.offset= pageLimit * (currentPage - 1);
  }

  const orders = await orderService.findAll(query);
  const total = await orderService.count(filter);

  data.orders = orders;
  data.totalRows = total;
  
  if(pageLimit){
    const from = (currentPage - 1) * pageLimit + 1;
    data.totalPages = Math.ceil(total / pageLimit);
    data.from = from;
    data.to = from + (orders.length - 1);
  }

  return res.status(200).json(data);
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

  if(status){
    order.status = status;
    if(status==="delivered"){
      order.paymentStatus = "paid";
    }
  }
  paymentStatus? order.paymentStatus = paymentStatus:null;

  order = await order.save();

  return res.status(200).json(order);
}

orderController.getMyOrders = async(req, res, next)=>{
  const userId= req.user.id;

  const orders = await orderService.getUserOrders(userId);
  return res.status(200).json(orders);
}

orderController.cancelOrder = async(req, res, next)=>{
  let order = await orderService.findOne({
    id:req.params.id,
    userId: req.user.id
  });

  if(!order){
    return next(new CustomError("The order doesn't exist.", 404));
  }
  console.log(order.status)
  if(order.status === "cancelled"){
    return next(new CustomError("The order is already cancelled", 400));
  }
  if(order.status !== "pending"){
    return next(new CustomError("The order is already in progress and cannot be cancelled now", 400));
  }
  order.status = "cancelled";
  order = await order.save();
  return res.status(200).json(order);
}

module.exports = orderController;