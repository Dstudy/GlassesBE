"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "colors",
      [
        { id: 1, name: "Black", hex_code: "#000000" },
        { id: 2, name: "White", hex_code: "#FFFFFF" },
        { id: 3, name: "Tortoise", hex_code: "#6B4F3A" },
        { id: 4, name: "Silver", hex_code: "#C0C0C0" },
        { id: 5, name: "Gold", hex_code: "#D4AF37" },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("colors", null, {});
  },
};
