"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "shapes",
      [
        { id: 1, name: "round" },
        { id: 2, name: "square" },
        { id: 3, name: "rectangle" },
        { id: 4, name: "cat-eye" },
        { id: 5, name: "aviator" },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("shapes", null, {});
  },
};
