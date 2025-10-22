import productService from "../services/productService.js";

const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        errCode: 1,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "OK",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting product details",
      error: error.message,
    });
  }
};

const getProductsByShape = async (req, res) => {
  try {
    const { shapeName } = req.params;
    const result = await productService.getProductsByShape(
      shapeName,
      req.query
    );
    return res.status(200).json({
      errCode: 0,
      message: `Products with shape: ${shapeName}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting products by shape",
      error: error.message,
    });
  }
};

const getProductsByColor = async (req, res) => {
  try {
    const { colorName } = req.params;
    const result = await productService.getProductsByColor(
      colorName,
      req.query
    );
    return res.status(200).json({
      errCode: 0,
      message: `Products with color: ${colorName}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting products by color",
      error: error.message,
    });
  }
};

const getAllProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const images = await productService.getAllProductImages(productId);
    return res.status(200).json({
      errCode: 0,
      message: `Images for product ID: ${productId}`,
      images: images,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting product images",
      error: error.message,
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await productService.getFeaturedProducts();
    console.log(
      "[CONTROLLER-TRY] Data received from service:",
      featuredProducts
    );
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      data: featuredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting featured products",
      error: error.message,
    });
  }
};

const getAllProductVariants = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await productService.getAllProductVariants({
      ...req.query,
      productId,
    });
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting product variants",
      error: error.message,
    });
  }
};

const getAllBrands = async (_req, res) => {
  try {
    const brands = await productService.getAllBrands();
    return res.status(200).json({ errCode: 0, message: "OK", data: brands });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting brands",
      error: error.message,
    });
  }
};

const getAllShapes = async (_req, res) => {
  try {
    const shapes = await productService.getAllShapes();
    return res.status(200).json({ errCode: 0, message: "OK", data: shapes });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting shapes",
      error: error.message,
    });
  }
};

const getAllColors = async (_req, res) => {
  try {
    const colors = await productService.getAllColors();
    return res.status(200).json({ errCode: 0, message: "OK", data: colors });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting colors",
      error: error.message,
    });
  }
};

const getAllMaterials = async (_req, res) => {
  try {
    const materials = await productService.getAllMaterials();
    return res.status(200).json({ errCode: 0, message: "OK", data: materials });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting materials",
      error: error.message,
    });
  }
};

const getAllFeatures = async (_req, res) => {
  try {
    const features = await productService.getAllFeatures();
    return res.status(200).json({ errCode: 0, message: "OK", data: features });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting features",
      error: error.message,
    });
  }
};

const getProductFeatures = async (req, res) => {
  try {
    const { productId } = req.params;
    const features = await productService.getProductFeatures(productId);
    return res.status(200).json({ errCode: 0, message: "OK", data: features });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: "Error getting product features",
      error: error.message,
    });
  }
};

const getFeature = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errCode: 1, message: "Feature ID is required" });
    }
    const feature = await productService.getFeature(id);
    if (!feature) {
      return res.status(404).json({ errCode: 1, message: "Feature not found" });
    }
    return res.status(200).json({ errCode: 0, message: "OK", data: feature });
  } catch (error) {
    return res
      .status(500)
      .json({
        errCode: 1,
        message: "Error getting feature",
        error: error.message,
      });
  }
};

export default {
  getAllProducts,
  getProductById,
  getProductsByShape,
  getProductsByColor,
  getAllProductImages,
  getFeaturedProducts,
  getAllProductVariants,
  getAllBrands,
  getAllShapes,
  getAllColors,
  getAllMaterials,
  getAllFeatures,
  getProductFeatures,
  getFeature,
};
