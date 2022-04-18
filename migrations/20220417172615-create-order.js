'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending"
      },
      subTotal: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      estimatedTax: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      estimatedTotal: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"unpaid"
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "cash"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};