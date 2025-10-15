"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const variations = [];
    // Create variations for the 15 products created in the previous seeder
    for (let productId = 1; productId <= 15; productId++) {
      // Create 2 to 4 variations for each product
      const numVariations = faker.number.int({ min: 2, max: 4 });
      const usedColorIds = new Set();

      for (let i = 0; i < numVariations; i++) {
        let colorId;
        // Ensure unique color for each product's variations
        do {
          colorId = faker.number.int({ min: 1, max: 5 }); // Assumes color IDs 1-5 exist
        } while (usedColorIds.has(colorId));
        usedColorIds.add(colorId);

        variations.push({
          product_id: productId,
          color_id: colorId,
          sku: faker.string.alphanumeric(10).toUpperCase(),
          stock_quantity: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("product_variations", variations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_variations", null, {});
  },
};
