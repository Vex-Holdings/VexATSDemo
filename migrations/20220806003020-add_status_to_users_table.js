'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'status',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users',
      'status'
    );
  }
};
