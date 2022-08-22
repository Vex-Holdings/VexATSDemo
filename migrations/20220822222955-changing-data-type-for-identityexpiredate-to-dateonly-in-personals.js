'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Personals', 'identityexpiredate', {
        type: Sequelize.DATEONLY,
        name: 'changing-data-type-for-identityexpiredate-to-dateonly-in-personals'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Personals',
      'changing-data-type-for-identityexpiredate-to-dateonly-in-personals'
    )
  }
};
