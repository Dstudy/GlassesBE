import db from "../models/index.js";

const getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        include: [
          { model: db.Brand, as: "Brand", attributes: ["id", "name"] },
          { model: db.Shape, as: "Shape", attributes: ["id", "name"] },
          { model: db.Material, as: "Material", attributes: ["id", "name"] },
          {
            model: db.ProductVariation,
            as: "ProductVariations",
            include: [
              {
                model: db.Color,
                as: "Color",
                attributes: ["id", "name", "hex_code"],
              },
              {
                model: db.ProductImage,
                as: "ProductImages",
                attributes: ["id", "pic_url", "display_order"],
              },
            ],
          },
        ],
      });
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          { model: db.Brand, as: "Brand", attributes: ["id", "name"] },
          { model: db.Shape, as: "Shape", attributes: ["id", "name"] },
          { model: db.Material, as: "Material", attributes: ["id", "name"] },
          {
            model: db.ProductVariation,
            as: "ProductVariations",
            include: [
              {
                model: db.Color,
                as: "Color",
                attributes: ["id", "name", "hex_code"],
              },
              {
                model: db.ProductImage,
                as: "ProductImages",
                attributes: ["id", "pic_url", "display_order"],
              },
            ],
          },
        ],
      });
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
};

const createProduct = (productData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = await db.Product.create(productData);
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, updateData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [updatedRowsCount] = await db.Product.update(updateData, {
        where: { id },
      });
      if (updatedRowsCount === 0) return resolve(null);
      const updatedProduct = await db.Product.findByPk(id);
      resolve(updatedProduct);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedRowsCount = await db.Product.destroy({ where: { id } });
      resolve(deletedRowsCount > 0);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductVariations = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const variations = await db.ProductVariation.findAll({
        where: { product_id: productId },
        include: [
          {
            model: db.Color,
            as: "Color",
            attributes: ["id", "name", "hex_code"],
          },
          {
            model: db.ProductImage,
            as: "ProductImages",
            attributes: ["id", "pic_url", "display_order"],
          },
        ],
      });
      resolve(variations);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductVariations,
};
