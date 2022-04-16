const {productService, categoryService, subCategoryService} = require("../services");
const {CustomError} = require("../helpers");
const fs = require("fs");
const path = require("path");

let productController = {};

productController.getProducts = async (req, res, next) => {
  const pageLimit = req.query && req.query.limit? Number(req.query.limit) : null;
  const currentPage = req.query && req.query.page ? Number(req.query.page) : 1;

  if(req.query.category && req.query.subCategory){
    const subCategory = await subCategoryService.findOne({
      id: req.query.subCategory,
      categoryId: req.query.category
    })
    if(!subCategory){
      return next(new CustomError("Category and subcategory doesn't belong to each other", 404))
    }
  }

  let data = {
    totalPages: 1,
    currentPage: currentPage,
    products: [],
  };
  const filterQuery = productService.buildQuery(req);

  const query = {
    where: filterQuery, 
  }

  if(pageLimit){
    data.pageLimit = pageLimit
    query.limit= pageLimit;
    query.offset= pageLimit * (currentPage - 1);
  }

  const products = await productService.findAll(query);
  const total = await productService.count(filterQuery);
  
  data.products = products;
  data.totalRows = total;
  
  if(pageLimit){
    const from = (currentPage - 1) * pageLimit + 1;
    data.totalPages = Math.ceil(total / pageLimit);
    data.from = from;
    data.to = from + (products.length - 1);
  }

  return res.status(200).json(data);
};

productController.getSingleProduct = async (req, res, next) => {
  const product = await productService.findOne({
    id: req.params.id,
  });

  if (!product) {
    return next(new CustomError("Can't find product with given id", 404));
  }

  return res.status(200).json(product);
};

productController.addNewProduct = async(req, res, next)=>{
  if(!req.file){
    return next(new CustomError("Picture is required", 404))
  }
  let category = await categoryService.findOne({id: req.body.categoryId});
  
  if(!category){
    return next(new CustomError("Invalid category for prodcut", 400));
  }
  let subCategory = await subCategoryService.findOne({
    id: req.body.subCategoryId,
    categoryId: req.body.categoryId
  })

  if(!subCategory){
    return next(new CustomError("Invalid category or sub category for prodcut", 400));
  }
  console.log(req.file.path)
  let productData = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    tag: req.body.tag,
    picture: req.file.path
  }

  const newProduct = await productService.add(productData);
  return res.status(200).json(newProduct);
};

productController.updateProduct = async (req, res, next) => {
  let { name, description, quantity, price, categoryId, subCategoryId, tag } = req.body;

  let product = await productService.findOne({
    id: req.params.id,
  });

  if (!product) {
    return next(new CustomError("Can't find product with given id", 404));
  }

  name ? (product.name = name) : null;
  description ? (product.description = description) : null;
  quantity ? (product.quantity = quantity) : null;
  price ? (product.price = price) : null;
  tag ? product.tag = tag : null;
  if(req.file){
    if(product.picture){
      let imagePath = path.join(__dirname+"../../"+product.picture); 
      if(fs.existsSync(imagePath)){
        fs.unlinkSync(imagePath);
      }
    }
    product.picture = req.file.path
  }
  if(categoryId){
    let category = await categoryService.findOne({id: categoryId});
  
    if(!category){
      return next(new CustomError("Invalid category for prodcut", 400));
    }
    product.categoryId = categoryId
  }

  if(subCategoryId){
    let query = {
      id: subCategoryId
    }
    categoryId? query.categoryId = categoryId: query.categoryId = product.categoryId;
    let subCategory = await subCategoryService.findOne(query)
  
    if(!subCategory){
      return next(new CustomError("Invalid category or sub category for prodcut", 400));
    }
    product.subCategoryId = subCategoryId
  }


  product = await product.save();

  return res.status(200).json(product);
};

productController.deleteProduct = async (req, res, next) => {
  let product = await productService.findOne({
    id: req.params.id,
  });

  if (!product) {
    return next(new CustomError("Can't find product with given id", 404));
  }

  await productService.delete({ id: req.params.id });
  return res.status(200).json({
    status: "success",
    data: null,
  });
};

productController.latestProducts = async(req, res, next)=>{
  const product = await productService.findAll({
    limit: 5,
    sort: [['createdAt', 'DESC']]
  });
  return res.status(200).json(product);
}
module.exports = productController;
