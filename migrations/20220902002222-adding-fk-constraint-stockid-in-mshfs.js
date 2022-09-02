'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Mshfs',{
        fields: ['stockid'],
        type: 'FOREIGN KEY',
        name: 'stockid-fk-in-mshfs',
        references: {
          table: 'Stocks',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Mshfs',
      'stockid-fk-in-mshfs'
    )
  }
};
