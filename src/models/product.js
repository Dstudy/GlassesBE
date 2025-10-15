import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      brand_id: { type: DataTypes.INTEGER },
      shape_id: { type: DataTypes.INTEGER },
      material_id: { type: DataTypes.INTEGER },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      length: { type: DataTypes.FLOAT },
      width: { type: DataTypes.FLOAT },
      lens_width: { type: DataTypes.FLOAT },
      lens_height: { type: DataTypes.FLOAT },
      bridge: { type: DataTypes.FLOAT },
      isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "products",
      timestamps: false,
    }
  );
};
