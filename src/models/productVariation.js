import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "ProductVariation",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      stock_quantity: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { tableName: "product_variations", timestamps: false }
  );
};
