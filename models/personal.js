'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Personal.init({
    userid: DataTypes.INTEGER,
    addressline1: DataTypes.STRING,
    addressline2: DataTypes.STRING,
    addresscity: DataTypes.STRING,
    addressstate: DataTypes.STRING,
    addresszip: DataTypes.STRING,
    maritalstatus: DataTypes.STRING,
    dependants: DataTypes.INTEGER,
    employmentstatus: DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    occupation: DataTypes.STRING,
    employername: DataTypes.STRING,
    employertime: DataTypes.INTEGER,
    employeraddress: DataTypes.STRING,
    employersuite: DataTypes.STRING,
    employercity: DataTypes.STRING,
    employerstate: DataTypes.STRING,
    employerzip: DataTypes.STRING,
    dateofbirth: DataTypes.DATEONLY,
    citizenship: DataTypes.STRING,
    taxidtype: DataTypes.STRING,
    taxidnumber: DataTypes.STRING,
    identitydocument: DataTypes.STRING,
    identityissuer: DataTypes.STRING,
    identitynumber: DataTypes.STRING,
    identityissuedate: DataTypes.DATEONLY,
    identityexpiredate: DataTypes.DATEONLY,
    accounttype: DataTypes.STRING,
    customertype: DataTypes.STRING,
    associated: DataTypes.STRING,
    associatedtype: DataTypes.STRING,
    associatedorganization: DataTypes.STRING,
    pubco: DataTypes.STRING,
    pubconame: DataTypes.STRING,
    pep: DataTypes.STRING,
    pepcountry: DataTypes.STRING,
    investmentobjective: DataTypes.STRING,
    investmentexperience: DataTypes.STRING,
    risktolerance: DataTypes.STRING,
    timehorizon: DataTypes.STRING,
    liquidity: DataTypes.STRING,
    income: DataTypes.STRING,
    networth: DataTypes.STRING,
    taxstatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personal',
  });
  return Personal;
};