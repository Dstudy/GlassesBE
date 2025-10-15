"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = bcrypt.hashSync("password123", 10);
    const users = [
      {
        fullname: "Admin User",
        email: "admin@example.com",
        password_hash: passwordHash,
        phonenumber: faker.phone.number(),
        role_id: 1, // Assumes role_id 1 is 'Admin'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: faker.person.fullName(),
        email: "customer@example.com",
        password_hash: passwordHash,
        phonenumber: faker.phone.number(),
        role_id: 2, // Assumes role_id 2 is 'Customer'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
