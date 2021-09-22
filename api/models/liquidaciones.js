'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class liquidaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  liquidaciones.init({
    status: DataTypes.INTEGER,
    periodo: DataTypes.STRING,
    empleado: DataTypes.STRING,
    legajo: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    detalle: DataTypes.ARRAY(DataTypes.JSON),
    pago: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'liquidaciones',
  });
  return liquidaciones;
};