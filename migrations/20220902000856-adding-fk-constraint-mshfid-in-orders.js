'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Orders',{
        fields: ['mshfid'],
        type: 'FOREIGN KEY',
        name: 'mshfid-fk-in-orders',
        references: {
          table: 'Mshfs',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Orders',
      'mshfid-fk-in-orders'
    )
  }
};
