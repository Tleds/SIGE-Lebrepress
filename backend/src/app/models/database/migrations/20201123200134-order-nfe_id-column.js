'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('orders', 'nfe_id', {
        type: Sequelize.STRING,
        allowNull:true,
     })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('orders', 'nfe_id');
  }
};
