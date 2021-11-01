'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  empresa.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    cuit: DataTypes.STRING,
    situacionIva: DataTypes.STRING,
    imp: DataTypes.INTEGER,
    tel: DataTypes.STRING,
    fechaIngreso: DataTypes.DATEONLY, 
  }, {
    sequelize,
    modelName: 'empresa',
  });
  return empresa;
};