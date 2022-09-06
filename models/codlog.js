'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Codlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Codlog.init({
    sellid: DataTypes.INTEGER,
    buyid: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    dollars: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Codlog',
  });
  return Codlog;
};