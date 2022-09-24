'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Taclears',{
        fields: ['changeid'],
        type: 'FOREIGN KEY',
        name: 'changeid-fk-in-taclears',
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
      'changeid-fk-in-taclears'
    )
  }
};
