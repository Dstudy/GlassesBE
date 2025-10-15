import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      status: DataTypes.STRING,
      shipping_address: DataTypes.STRING,
      notes: DataTypes.TEXT,
      total_amount: DataTypes.DECIMAL(10, 2),
    },
    { tableName: "orders", timestamps: false }
  );
