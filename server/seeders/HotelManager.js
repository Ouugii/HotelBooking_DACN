"use strict";

const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return (password = await bcrypt.hash(password, salt));
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("user", [
      {
        user_name: "hm1",
        email: "hm1@example.com",
        password: await hashPassword("123"),
        role: "HOTEL_MANAGER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_name: "hm2",
        email: "hm2@example.com",
        password: await hashPassword("123"),
        role: "HOTEL_MANAGER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("user", {
      [Sequelize.Op.and]: [{ user_name: "hm1" }, { user_name: "hm2" }],
    });
  },
};
