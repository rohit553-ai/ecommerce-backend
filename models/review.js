'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    userId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:"Users",
        key:"id"
      }
    },
    productId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Products",
        key:"id"
      }
    },
    reviewMessage: DataTypes.STRING,
    ratings: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};