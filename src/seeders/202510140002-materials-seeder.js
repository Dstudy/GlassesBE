"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "materials",
      [
        { id: 1, name: "acetate" },
        { id: 2, name: "metal" },
        { id: 3, name: "titanium" },
        { id: 4, name: "plastic" },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("materials", null, {});
  },
};
