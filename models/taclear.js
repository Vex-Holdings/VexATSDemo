'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taclear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Taclear.init({
    debitid: DataTypes.INTEGER,
    creditid: DataTypes.INTEGER,
    changeid: DataTypes.INTEGER,
    total: DataTypes.DOUBLE,
    buyfee: DataTypes.DOUBLE,
    sellfee: DataTypes.DOUBLE,
    proceeds: DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Taclear',
  });
  return Taclear;
};