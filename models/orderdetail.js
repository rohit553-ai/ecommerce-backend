'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order, Product}) {
      // define association here
      this.belongsTo(Order, {foreignKey: "orderId", as:"order"});
      this.belongsTo(Product, {foreignKey: "productId", as:"product"})
    }
  }
  OrderDetail.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};