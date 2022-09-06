'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Codlogs',{
        fields: ['sellid'],
        type: 'FOREIGN KEY',
        name: 'sellid-fk-in-codlogs',
        references: {
          table: 'Codsells',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Codlogs',
      'sellid-fk-in-codlogs'
    )
  }
};
