"use strict";

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
    await queryInterface.bulkInsert("Pictures", [
      {
        userId: 1,
        fileLocation: "public/images/DSC_0008.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        fileLocation: 'public/images/aurora.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        fileLocation: "public/images/balloons.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: 'public/images/iceland.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: "public/images/sunny-plains.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: 'public/images/waterfall.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Pictures", null, {});
  },
};
