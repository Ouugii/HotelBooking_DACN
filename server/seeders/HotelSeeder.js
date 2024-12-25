"use strict";

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

    return queryInterface.bulkInsert("hotel", [
      {
        hotel_name: "TEST--Terrasse Des Roses",
        code_ward: "24769",
        id_manager: 1,
        house_number: "35",
        street_name: "Cao Bá Quát",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        hotel_name: "TEST--May Flower Hotel Hanoi",
        code_ward: "00043",
        id_manager: 1,
        house_number: "01",
        street_name: "Phố Hàng Rươi",
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

    return queryInterface.bulkDelete("hotel", {
      [Sequelize.Op.and]: [
        { hotel_name: "TEST--May Flower Hotel Hanoi", code_ward: "00043" },
        { hotel_name: "TEST--Terrasse Des Roses", code_ward: "24769" },
      ],
    });
  },
};
