"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      order_date: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING },
      shipping_address: { type: Sequelize.STRING },
      notes: { type: Sequelize.TEXT },
      total_amount: { type: Sequelize.DECIMAL(10, 2) },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};
