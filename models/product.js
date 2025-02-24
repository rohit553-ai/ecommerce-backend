'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, WishList, SubCategory, OrderDetail}) {
      // define association here
      this.belongsTo(Category, {foreignKey: "categoryId", as: "category"});
      this.belongsTo(SubCategory, {foreignKey: "subCategoryId", as: "subCategory"});
      this.hasMany(WishList, {foreignKey: "productId", as:"wishLists"});
      this.hasMany(OrderDetail, {foreignKey:"productId", as:"orderDetails"});
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Category",
        key:"id"
      }
    },
    description: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitsSold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag: DataTypes.STRING,
    subCategoryId:{
      type: DataTypes.INTEGER,
      references:{
        model:"SubCategory",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};