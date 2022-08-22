'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      addressline1: {
        type: Sequelize.STRING
      },
      addressline2: {
        type: Sequelize.STRING
      },
      addresscity: {
        type: Sequelize.STRING
      },
      addressstate: {
        type: Sequelize.STRING
      },
      addresszip: {
        type: Sequelize.STRING
      },
      maritalstatus: {
        type: Sequelize.STRING
      },
      dependants: {
        type: Sequelize.INTEGER
      },
      employmentstatus: {
        type: Sequelize.STRING
      },
      jobtitle: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      employername: {
        type: Sequelize.STRING
      },
      employertime: {
        type: Sequelize.INTEGER
      },
      employeraddress: {
        type: Sequelize.STRING
      },
      employersuite: {
        type: Sequelize.STRING
      },
      employercity: {
        type: Sequelize.STRING
      },
      employerstate: {
        type: Sequelize.STRING
      },
      employerzip: {
        type: Sequelize.STRING
      },
      dateofbirth: {
        type: Sequelize.DATE
      },
      citizenship: {
        type: Sequelize.STRING
      },
      taxidtype: {
        type: Sequelize.STRING
      },
      taxidnumber: {
        type: Sequelize.STRING
      },
      identitydocument: {
        type: Sequelize.STRING
      },
      identityissuer: {
        type: Sequelize.STRING
      },
      identitynumber: {
        type: Sequelize.STRING
      },
      identityissuedate: {
        type: Sequelize.DATE
      },
      identityexpiredate: {
        type: Sequelize.DATE
      },
      accounttype: {
        type: Sequelize.STRING
      },
      customertype: {
        type: Sequelize.STRING
      },
      associated: {
        type: Sequelize.STRING
      },
      associatedtype: {
        type: Sequelize.STRING
      },
      associatedorganization: {
        type: Sequelize.STRING
      },
      pubco: {
        type: Sequelize.STRING
      },
      pubconame: {
        type: Sequelize.STRING
      },
      pep: {
        type: Sequelize.STRING
      },
      pepcountry: {
        type: Sequelize.STRING
      },
      investmentobjective: {
        type: Sequelize.STRING
      },
      investmentexperience: {
        type: Sequelize.STRING
      },
      risktolerance: {
        type: Sequelize.STRING
      },
      timehorizon: {
        type: Sequelize.STRING
      },
      liquidity: {
        type: Sequelize.STRING
      },
      income: {
        type: Sequelize.STRING
      },
      networth: {
        type: Sequelize.STRING
      },
      taxstatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Personals');
  }
};