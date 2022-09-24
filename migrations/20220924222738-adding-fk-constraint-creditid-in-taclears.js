'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Taclears',{
        fields: ['creditid'],
        type: 'FOREIGN KEY',
        name: 'creditid-fk-in-taclears',
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
      'creditid-fk-in-taclears'
    )
  }
};
