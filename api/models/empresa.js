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
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    cuit: DataTypes.BIGINT,
    email: DataTypes.STRING,
    situacionIva: DataTypes.STRING,
    imp: DataTypes.REAL,
    descuento: DataTypes.REAL,
    tel: DataTypes.STRING,
    empleados: DataTypes.ARRAY(DataTypes.BIGINT),
    cuentaCorriente: DataTypes.ARRAY(DataTypes.JSON),
  }, {
    sequelize,
    modelName: 'empresa',
  });
  return empresa;
};