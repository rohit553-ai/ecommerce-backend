const {productService, categoryService} = require("../services");
const {CustomError} = require("../helpers")

let productController = {};

productController.getProducts = async(req, res, next)=>{

}

productController.getSingleProduct = async(req, res, next)=>{
  const product = await productService.findOne({
    id: req.params.id
  })

  if(!product){
    return next(new CustomError("Can't find product with given id", 404))
  }

  return res.status(200).json(product);
}

productController.addNewProduct = async(req, res, next)=>{
  let category = await categoryService.findOne({id: req.body.categoryId});
  if(!category){
    return next(new CustomError("Invalid category for prodcut", 400));
  }

  let productData = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price
  }

  const newProduct = await productService.add(productData);
  return res.status(200).json(newProduct);
}

productController.updateProduct = async(req, res, next)=>{
  let {name, description, quantity, price} = req.body;

  let product = await productService.findOne({
    id: req.params.id
  })

  if(!product){
    return next(new CustomError("Can't find product with given id", 404))
  }

  name? product.name = name : null;
  description? product.description = description : null;
  quantity? product.quantity = quantity : null;
  price? product.price = price : null;

  product = await product.save();

  return res.status(200).json(product);
}

productController.deleteProduct = async(req, res, next)=>{
  let product = await productService.findOne({
    id: req.params.id
  })

  if(!product){
    return next(new CustomError("Can't find product with given id", 404))
  }

  await productService.delete({id: req.params.id});
  return res.status(200).json({
    status:"success",
    data: null
  })
}

module.exports = productController;