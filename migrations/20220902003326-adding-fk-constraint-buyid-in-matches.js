'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Matches',{
        fields: ['buyid'],
        type: 'FOREIGN KEY',
        name: 'buyid-fk-in-matches',
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
      'buyid-fk-in-matches'
    )
  }
};
