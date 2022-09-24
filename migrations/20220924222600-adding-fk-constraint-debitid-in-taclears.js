'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Taclears',{
        fields: ['debitid'],
        type: 'FOREIGN KEY',
        name: 'debitid-fk-in-taclears',
        references: {
          table: 'Mshfs',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Taclears',
      'debitid-fk-in-taclears'
    )
  }
};
