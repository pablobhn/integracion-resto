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
      cuit: {
        type: Sequelize.INTEGER
      },
      situacionIva: {
        type: Sequelize.INTEGER
      },
      imp: {
        type: Sequelize.INTEGER
      },
      tel: {
        type: Sequelize.STRING
      },
      fechaIngreso: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      fechaNacimiento: {
        allowNull: false,
        type: Sequelize.DATEONLY
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
