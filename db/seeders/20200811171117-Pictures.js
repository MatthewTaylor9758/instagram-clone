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
        description: "This is a cat lounging",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        fileLocation: 'public/images/aurora.jpg',
        description: 'The aurora Borealis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        fileLocation: "public/images/balloons.jpg",
        description: 'Happy lady with balloons',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: 'public/images/iceland.jpg',
        description: 'The frozen tundra',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: "public/images/sunny-plains.jpg",
        description: 'Wide open plains with a sunset',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        fileLocation: 'public/images/waterfall.jpg',
        description: 'Waterfall into a ravine',
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
