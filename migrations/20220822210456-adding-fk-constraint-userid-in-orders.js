'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Orders',{
        fields: ['userid'],
        type: 'FOREIGN KEY',
        name: 'userid-fk-in-orders',
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Orders',
      'userid-fk-in-orders'
    )
  }
};
