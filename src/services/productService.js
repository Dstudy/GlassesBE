import models from "../models/index.js";

const {
  Product,
  ProductVariation,
  ProductImage,
  Brand,
  Shape,
  Color,
  Material,
} = models;

const getAllProducts = async (queryParams) => {
  try {
    const { page = 1, limit = 12, brand, shape, material } = queryParams;

    const numericLimit = parseInt(limit, 10);
    const numericPage = parseInt(page, 10);
    const offset = (numericPage - 1) * numericLimit;

    // Always include lookup tables so FE can resolve names
    const includeClause = [
      { model: Brand, attributes: ["id", "name"] },
      { model: Shape, attributes: ["id", "name"] },
      { model: Material, attributes: ["id", "name"] },
    ];

    // Add filters if provided by overriding corresponding include with where
    if (brand) {
      includeClause[0] = {
        model: Brand,
        attributes: ["id", "name"],
        where: { name: brand },
        required: true,
      };
    }

    if (shape) {
      includeClause[1] = {
        model: Shape,
        attributes: ["id", "name"],
        where: { name: shape },
        required: true,
      };
    }

    if (material) {
      includeClause[2] = {
        model: Material,
        attributes: ["id", "name"],
        where: { name: material },
        required: true,
      };
    }

    // Category filtering is disabled because Category model/associations are not defined

    const { count, rows } = await Product.findAndCountAll({
      include: includeClause,
      limit: numericLimit,
      offset: offset,
      distinct: true, // Crucial for correct counts with JOINs
      // To prevent Sequelize from including all associations by default,
      // you can add `subQuery: false` if you run into issues with complex queries,
      // but 'distinct: true' is usually sufficient.
    });

    return {
      totalProducts: count,
      totalPages: Math.ceil(count / numericLimit),
      currentPage: numericPage,
      products: rows,
    };
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    // You should re-throw or handle the error properly
    throw new Error("Failed to get products.");
  }
};

const getAllBrands = async () => {
  const brands = await Brand.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
  return brands;
};

const getAllShapes = async () => {
  const shapes = await Shape.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
  return shapes;
};

const getAllColors = async () => {
  const colors = await Color.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
  return colors;
};

const getAllMaterials = async () => {
  const materials = await Material.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });
  return materials;
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      { model: Brand },
      { model: Shape },
      { model: Material },
      {
        model: ProductVariation,
        attributes: { exclude: ["price"] },
        include: [{ model: Color }, { model: ProductImage, limit: 1 }],
      },
    ],
  });
  return product;
};

const getProductsByShape = async (shapeName, queryParams) => {
  const { page = 1, limit = 12 } = queryParams;
  const offset = (page - 1) * limit;

  const productsData = await Product.findAndCountAll({
    include: [
      {
        model: Shape,
        where: { name: shapeName },
        required: true, // Makes this an INNER JOIN
      },
      { model: Brand }, // Also include brand info
    ],
    limit: parseInt(limit, 10),
    offset: offset,
  });

  return {
    totalProducts: productsData.count,
    totalPages: Math.ceil(productsData.count / limit),
    currentPage: parseInt(page, 10),
    products: productsData.rows,
  };
};

const getProductsByColor = async (colorName, queryParams) => {
  const { page = 1, limit = 12 } = queryParams;
  const offset = (page - 1) * limit;

  // This query finds products that have at least one variant of the specified color.
  const productsData = await Product.findAndCountAll({
    include: [
      {
        model: ProductVariation,
        attributes: { exclude: ["price"] },
        required: true,
        include: [
          {
            model: Color,
            where: { name: colorName },
            required: true,
          },
        ],
      },
      { model: Brand }, // Also include brand info
    ],
    limit: parseInt(limit, 10),
    offset: offset,
    distinct: true,
  });

  return {
    totalProducts: productsData.count,
    totalPages: Math.ceil(productsData.count / limit),
    currentPage: parseInt(page, 10),
    products: productsData.rows,
  };
};

const getAllProductImages = async (productId) => {
  const images = await ProductImage.findAll({
    include: [
      {
        model: ProductVariation,
        attributes: [], // We only need it for the join
        where: { product_id: productId },
        required: true,
      },
    ],
    order: [["display_order", "ASC"]],
  });

  return images;
};

const getFeaturedProducts = async () => {
  try {
    const featuredProducts = await Product.findAll({
      where: { isFeatured: true },
      limit: 8,
      include: [
        { model: Brand },
        { model: Shape },
        {
          model: ProductVariation,
          attributes: { exclude: ["price"] },
          include: [
            {
              model: ProductImage,
              limit: 1,
            },
            { model: Color },
          ],
        },
      ],
    });

    return { products: featuredProducts };
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    throw new Error("Failed to get featured products.");
  }
};

const getAllProductVariants = async (queryParams) => {
  try {
    const { page = 1, limit = 12, productId, color } = queryParams;

    const numericLimit = parseInt(limit, 10);
    const numericPage = parseInt(page, 10);
    const offset = (numericPage - 1) * numericLimit;

    const whereClause = {};
    if (productId) {
      whereClause.product_id = productId;
    }

    const includeClause = [
      {
        model: Product,
        include: [{ model: Brand }, { model: Shape }, { model: Material }],
      },
      { model: ProductImage, limit: 1 },
    ];

    if (color) {
      includeClause.push({
        model: Color,
        where: { name: color },
        required: true,
      });
    } else {
      includeClause.push({ model: Color });
    }

    const { count, rows } = await ProductVariation.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ["price"] },
      include: includeClause,
      limit: numericLimit,
      offset: offset,
      distinct: true,
    });

    return {
      totalVariants: count,
      totalPages: Math.ceil(count / numericLimit),
      currentPage: numericPage,
      variants: rows,
    };
  } catch (error) {
    console.error("Error in getAllProductVariants:", error);
    throw new Error("Failed to get product variants.");
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
};
