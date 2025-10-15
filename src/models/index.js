import { Sequelize } from "sequelize";
import Product from "./product.js";
import ProductVariation from "./productVariation.js";
import ProductImage from "./productImage.js";
import Brand from "./brand.js";
import Shape from "./shape.js";
import Material from "./material.js";
import Color from "./color.js";
import User from "./user.js";
import Role from "./role.js";
import Cart from "./cart.js";
import CartItem from "./cartItem.js";
import Order from "./order.js";
import OrderItem from "./orderItem.js";
import Favorite from "./favorite.js";

// ✅ Initialize Sequelize
const sequelize = new Sequelize("glasses", "root", "1", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// ✅ Initialize models
// We store the initialized models in this 'models' object
const models = {
  Product: Product(sequelize),
  ProductVariation: ProductVariation(sequelize),
  ProductImage: ProductImage(sequelize),
  Brand: Brand(sequelize),
  Shape: Shape(sequelize),
  Material: Material(sequelize),
  Color: Color(sequelize),
  User: User(sequelize),
  Role: Role(sequelize),
  Cart: Cart(sequelize),
  CartItem: CartItem(sequelize),
  Order: Order(sequelize),
  OrderItem: OrderItem(sequelize),
  Favorite: Favorite(sequelize),
};

// =================================================================
// ✅ Define Associations using the initialized models from the 'models' object
// =================================================================

// --- Product relationships ---
models.Brand.hasMany(models.Product, { foreignKey: "brand_id" });
models.Shape.hasMany(models.Product, { foreignKey: "shape_id" });
models.Material.hasMany(models.Product, { foreignKey: "material_id" });

models.Product.belongsTo(models.Brand, { foreignKey: "brand_id" });
models.Product.belongsTo(models.Shape, { foreignKey: "shape_id" });
models.Product.belongsTo(models.Material, { foreignKey: "material_id" });

models.Product.hasMany(models.ProductVariation, { foreignKey: "product_id" });
models.ProductVariation.belongsTo(models.Product, { foreignKey: "product_id" });

// --- Product Variations & Images ---
models.Color.hasMany(models.ProductVariation, { foreignKey: "color_id" });
models.ProductVariation.belongsTo(models.Color, { foreignKey: "color_id" });

models.ProductVariation.hasMany(models.ProductImage, {
  foreignKey: "product_variation_id",
});
models.ProductImage.belongsTo(models.ProductVariation, {
  foreignKey: "product_variation_id",
});

// --- Users & Roles ---
models.Role.hasMany(models.User, { foreignKey: "role_id" });
models.User.belongsTo(models.Role, { foreignKey: "role_id" });

// --- Carts & Items ---
models.User.hasOne(models.Cart, { foreignKey: "user_id" });
models.Cart.belongsTo(models.User, { foreignKey: "user_id" });

models.Cart.hasMany(models.CartItem, { foreignKey: "cart_id" });
models.CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" });

models.ProductVariation.hasMany(models.CartItem, {
  foreignKey: "product_variation_id",
});
models.CartItem.belongsTo(models.ProductVariation, {
  foreignKey: "product_variation_id",
});

// --- Orders & Items ---
models.User.hasMany(models.Order, { foreignKey: "user_id" });
models.Order.belongsTo(models.User, { foreignKey: "user_id" });

models.Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
models.OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });

models.ProductVariation.hasMany(models.OrderItem, {
  foreignKey: "product_variation_id",
});
models.OrderItem.belongsTo(models.ProductVariation, {
  foreignKey: "product_variation_id",
});

// --- Favorites ---
models.User.hasMany(models.Favorite, { foreignKey: "user_id" });
models.Product.hasMany(models.Favorite, { foreignKey: "product_id" });
models.Favorite.belongsTo(models.User, { foreignKey: "user_id" });
models.Favorite.belongsTo(models.Product, { foreignKey: "product_id" });

// ✅ Export models + sequelize instance
export { sequelize };
export default models;
