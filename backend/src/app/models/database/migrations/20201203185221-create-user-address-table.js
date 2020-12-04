'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('user_address', {
       id:{
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
       },
       id_user:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'users',
        },
       },
       zip_code:{
         type: Sequelize.STRING(8),
         allowNull: false,
       },
       street:{
         type: Sequelize.STRING(100),
         allowNull:false,
       },
       number:{
         type: Sequelize.STRING(8),
         allowNull:false,
       },
       complement:{
         type: Sequelize.STRING(100),
         allowNull:false,
       },
       neighborhood:{
        type: Sequelize.STRING(100),
        allowNull:false,
      },
      city:{
        type: Sequelize.STRING(100),
        allowNull:false,
      },
      state:{
        type: Sequelize.STRING(2),
        allowNull:false,
      },
       created_at:{
         type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.fn('Now'),
       },
       updated_at:{
         type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.fn('Now'),
       }
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('user_address');
  }
};
