'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('orders', 'price', {
        type: Sequelize.FLOAT,
        allowNull:false,
     })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('orders', 'price');
  }
};
