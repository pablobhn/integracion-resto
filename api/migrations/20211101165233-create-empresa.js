'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('empresas', {
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
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      cuit: {
        type: Sequelize.BIGINT
      },
      situacionIva: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      imp: {
        type: Sequelize.REAL
      },
      descuento: {
        type: Sequelize.REAL
      },
      tel: {
        type: Sequelize.STRING
      },
      cuentaCorriente: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      empleados: {
        type: Sequelize.ARRAY(Sequelize.BIGINT)
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('empresas');
  }
};
