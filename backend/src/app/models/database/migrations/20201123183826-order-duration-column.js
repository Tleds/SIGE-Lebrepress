'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('orders', 'trip_duration', {
        type: Sequelize.STRING(50),
        allowNull:false,
     })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('orders', 'trip_duration');
  }
};
