'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empleados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      fechaNacimiento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      rate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      horasExtra: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      faltas: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.JSON)
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
    await queryInterface.dropTable('empleados');
  }
};