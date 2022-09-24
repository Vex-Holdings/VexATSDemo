'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Codbuys',{
        fields: ['orderlink'],
        type: 'FOREIGN KEY',
        name: 'orderlink-fk-in-codbuys',
        references: {
          table: 'Orders',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Codbuys',
      'mshfid-fk-in-codbuys'
    )
  }
};
