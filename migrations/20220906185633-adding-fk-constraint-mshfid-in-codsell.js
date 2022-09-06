'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Codsells',{
        fields: ['mshfid'],
        type: 'FOREIGN KEY',
        name: 'mshfid-fk-in-codsells',
        references: {
          table: 'Mshfs',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Codsells',
      'mshfid-fk-in-codsells'
    )
  }
};
