'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ventas.init({
    mesa: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    detalle: DataTypes.ARRAY(DataTypes.JSON),
    pago: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};