'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Codbuy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Codbuy.init({
    userid: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    orderlink: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Codbuy',
  });
  return Codbuy;
};