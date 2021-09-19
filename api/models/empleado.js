'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  empleado.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    status: DataTypes.INTEGER,
    fechaNacimiento: DataTypes.DATEONLY,
    fechaIngreso: DataTypes.DATEONLY,
    rate: DataTypes.INTEGER,
    horasBase: DataTypes.INTEGER,
    horasExtra: DataTypes.ARRAY(DataTypes.JSON),
    faltas: DataTypes.ARRAY(DataTypes.JSON)
    
  }, {
    sequelize,
    modelName: 'empleado',
  });
  return empleado;
};