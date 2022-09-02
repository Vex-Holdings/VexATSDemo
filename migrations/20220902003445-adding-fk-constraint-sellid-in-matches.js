'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Matches',{
        fields: ['sellid'],
        type: 'FOREIGN KEY',
        name: 'sellid-fk-in-matches',
        references: {
          table: 'Orders',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Matches',
      'sellid-fk-in-matches'
    )
  }
};
