'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Orders',{
        fields: ['stockid'],
        type: 'FOREIGN KEY',
        name: 'stockid-fk-in-orders',
        references: {
          table: 'Stocks',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Orders',
      'stockid-fk-in-orders'
    )
  }
};
