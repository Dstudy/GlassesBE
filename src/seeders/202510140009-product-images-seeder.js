"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [variations] = await queryInterface.sequelize.query(
      "SELECT id FROM product_variations ORDER BY id ASC;"
    );

    const images = variations.map((v) => ({
      product_variation_id: v.id,
      pic_url: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
      display_order: 1,
    }));

    await queryInterface.bulkInsert("product_images", images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_images", null, {});
  },
};
