"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    const productNames = [
      "Aviator Classic",
      "Wayfarer Ease",
      "Round Metal",
      "Clubmaster Classic",
      "Erika Classic",
      "Justin Classic",
      "Hexagonal Flat",
      "New Wayfarer",
      "Round Fleck",
      "State Street",
      "Nomad Classic",
      "Olympian Reloaded",
      "Caribbean Sun",
      "Meteor Classic",
      "General Classic",
    ];

    for (let i = 0; i < 15; i++) {
      products.push({
        name: productNames[i] || faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        brand_id: faker.number.int({ min: 1, max: 3 }), // Assumes brand IDs 1-3 exist
        shape_id: faker.number.int({ min: 1, max: 3 }), // Assumes shape IDs 1-3 exist
        material_id: faker.number.int({ min: 1, max: 2 }), // Assumes material IDs 1-2 exist
        price: faker.number.float({ min: 49, max: 299, precision: 0.01 }),
        length: faker.number.int({ min: 135, max: 150 }),
        width: faker.number.int({ min: 120, max: 140 }),
        lens_width: faker.number.int({ min: 48, max: 58 }),
        lens_height: faker.number.int({ min: 40, max: 50 }),
        bridge: faker.number.int({ min: 17, max: 22 }),
        isFeatured: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
