'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Product}) {
      // define association here
      this.belongsTo(Category, {foreignKey:"categoryId", as:"category"});
      this.hasMany(Product, {foreignKey:"subCategoryId", as:"products"});
    }
  }
  SubCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Categories",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};