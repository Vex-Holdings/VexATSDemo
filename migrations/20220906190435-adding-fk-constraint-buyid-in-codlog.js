'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Codlogs',{
        fields: ['buyid'],
        type: 'FOREIGN KEY',
        name: 'buyid-fk-in-codlogs',
        references: {
          table: 'Codbuys',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Codlogs',
      'buyid-fk-in-codlogs'
    )
  }
};
