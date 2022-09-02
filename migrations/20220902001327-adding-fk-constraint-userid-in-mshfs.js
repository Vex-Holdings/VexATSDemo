'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'Mshfs',{
        fields: ['userid'],
        type: 'FOREIGN KEY',
        name: 'userid-fk-in-mshfs',
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Mshfs',
      'userid-fk-in-mshfs'
    )
  }
};
