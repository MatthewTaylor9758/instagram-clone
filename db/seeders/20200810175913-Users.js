"use strict";

const bcrypt = require("bcryptjs");
const { query } = require("express");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "DemoUser",
          email: "demo@user.io",
          isPrivate: false,
          password: await bcrypt.hash("password", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { fields: ["userName", "email", "password"] }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
