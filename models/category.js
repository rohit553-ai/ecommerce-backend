'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, SubCategory}) {
      // define association here
      this.hasMany(Product, {foreignKey:"categoryId", as:"products"});
      this.hasMany(SubCategory, {foreignKey:"categoryId", as:"subCategories"});
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};