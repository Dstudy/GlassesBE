import express from "express";
import getHomePage from "../controllers/homeController.js";
import userController from "../controllers/userController.js";
import adminProductController from "../controllers/admin.productController.js";
import productController from "../controllers/productController.js";
import favoriteController from "../controllers/favoriteController.js";
import cartController from "../controllers/cartController.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getHomePage);

  // User routes
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.getAllUsers);

  // Admin Product routes
  router.get("/api/admin/products", adminProductController.getAllProducts);
  router.get("/api/admin/products/:id", adminProductController.getProductById);
  router.post("/api/admin/products", adminProductController.createProduct);
  router.put("/api/admin/products/:id", adminProductController.updateProduct);
  router.delete(
    "/api/admin/products/:id",
    adminProductController.deleteProduct
  );
  router.get(
    "/api/admin/products/:productId/variations",
    adminProductController.getProductVariations
  );

  //User Product routes
  router.get("/api/products", productController.getAllProducts);
  router.get("/api/products/:id", productController.getProductById);
  router.get("/api/products/featured", productController.getFeaturedProducts);
  // Avoid collision with /api/products/:id by making shape a sub-path
  router.get(
    "/api/products/shape/:shapeName",
    productController.getProductsByShape
  );
  router.get(
    "/api/products/color/:colorName",
    productController.getProductsByColor
  );
  router.get(
    "/api/products/:productId/images",
    productController.getAllProductImages
  );
  router.get(
    "/api/products/:productId/variants",
    productController.getAllProductVariants
  );

  // Favorites
  router.get("/api/users/:userId/favorites", favoriteController.list);
  router.post("/api/favorites", favoriteController.add);
  router.delete(
    "/api/users/:userId/favorites/:productId",
    favoriteController.remove
  );

  // Cart
  router.get("/api/users/:userId/cart", cartController.getCart);
  router.post("/api/users/:userId/cart/items", cartController.addItem);
  router.put("/api/users/:userId/cart/items", cartController.updateItem);
  router.delete(
    "/api/users/:userId/cart/items/:productVariationId",
    cartController.removeItem
  );
  router.delete("/api/users/:userId/cart", cartController.clearCart);

  // Lookup routes for FE to resolve ids to names
  router.get("/api/brands", productController.getAllBrands);
  router.get("/api/shapes", productController.getAllShapes);
  router.get("/api/colors", productController.getAllColors);
  router.get("/api/materials", productController.getAllMaterials);

  return app.use("/", router);
};

export default initWebRoutes;
