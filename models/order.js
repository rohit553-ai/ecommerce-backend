'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, OrderDetail}) {
      // define association here
      this.belongsTo(User, {foreignKey:"userId", as:"user"});
      this.hasMany(OrderDetail, {foreignKey: "orderId", as:"orderDetails"})
    }
  }
  Order.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    },
    subTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    estimatedTax: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    estimatedTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"unpaid"
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "cash"
    },
    userId:{
      type:DataTypes.INTEGER,
      references:{
        model:"Users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete: "CASCADE"
    },
    deliveryAddress:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};