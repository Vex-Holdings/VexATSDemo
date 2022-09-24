'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Codbuys',
      'orderlink',
      Sequelize.INTEGER
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Codbuys',
      'orderlink'
    );
  }
};
