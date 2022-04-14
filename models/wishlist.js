'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Product}) {
      // define association here
      this.belongsTo(Product, {foreignKey: "productId", as:"product"});
      this.belongsTo(User, {foreignKey: "userId", as:"user"});
    }
  }
  WishList.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Products",
        key:"id"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Users",
        key:"id"
      }
    },
  }, {
    sequelize,
    modelName: 'WishList',
  });
  return WishList;
};