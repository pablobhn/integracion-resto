'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('liquidaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      periodo: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        primaryKey: true
      },
      empleado: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      legajo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      total: {
        type: Sequelize.DECIMAL
      },
      detalle: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      pago: {
        type: Sequelize.JSON
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('liquidaciones');
  }
};