'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Personals', 'identityissuedate', {
        type: Sequelize.DATEONLY,
        name: 'changing-data-type-for-identityissuedate-to-dateonly-in-personals'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Personals',
      'changing-data-type-for-identityissuedate-to-dateonly-in-personals'
    )
  }
};
