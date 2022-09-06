'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Codbuys',{
        fields: ['userid'],
        type: 'FOREIGN KEY',
        name: 'userid-fk-in-codbuys',
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Codbuys',
      'userid-fk-in-codbuys'
    )
  }
};
